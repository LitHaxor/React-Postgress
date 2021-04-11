import React, { useState } from 'react'
import styled from '@emotion/styled';
import resturantApis from '../apis/resturantApis';
import { useHistory, useLocation, useParams } from 'react-router';
const AddReview = () => {
    const {id}= useParams();
    const [name,setName] = useState('');
    const [rating,setRating]=useState(0);
    const [review, setReview] = useState('');
    const history = useHistory();
    const location = useLocation();


    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const data = await resturantApis.post(`/resturants/${id}/review`,{
                id,
                name,
                review,
                rating
            });
            console.log(data);
            history.push('/');
            history.push(location.pathname)
        } catch(err){console.log(err)}
    }
    return (
        <div className="mb-2">
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input 
                        type="text"
                        placeholder="name"
                        value={name}
                        className="form-control"
                        onChange={e=>setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group col">
                        <label htmlFor="Rating">Ratting</label>
                            <select name="rating" className="form-select" value={rating} onChange={e=>setRating(e.target.value)} >
                                <option value="">Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                    </div>
                
                    <div className="form-group col-12">
                        <label htmlFor="Review">Review</label>
                        <input 
                            type="text"
                            value={review}
                            onChange={e=> setReview(e.target.value)}
                            placeholder="Enter review"
                            className="form-control"/>
                    </div>
                    
                    <Buttons className="btn-group">
                        <button 
                        className="btn btn-success"
                        type="submit"
                        >Submit</button>
                    </Buttons>
                </div>
            </form>
            
        </div>
    )
}


const Buttons= styled.div`
    margin-top: 1rem;
`
export default AddReview
