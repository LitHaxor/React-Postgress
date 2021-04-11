import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import resturantApis from '../apis/resturantApis';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRatting';

const ResturantDetail = () => {
    const {id} = useParams();
    const [resturants, setResturants] = useState([]);
    const [reviews, setReviews] = useState([]);
    useEffect(()=>{
        const fetchData = async() =>{
            try{
                const {data} = await resturantApis.get(`/resturants/${id}`);
                setResturants(data.resturants);
                setReviews(data.reviews);
            } catch(err){console.log(err);}
        }
        fetchData()
    },[id, setResturants]);
    console.log(reviews);
    return (
        <div className="container">
            <h1 className="text-dark text-center">
                {resturants.name}
            </h1>
            <div className="text-center">
                {
                    resturants.count>0? (<span><StarRating rating={resturants.average_rating}/>({resturants.count}) Reviews</span>): (<span className="text-danger">No Reviews</span>)
                }
            </div>
            <div className="row row-cols-4 mb-2">
                {
                    reviews.map((e)=>(
                        
                            <Reviews
                            name={e.name}
                            rating={e.rating}
                            review={e.review} />
                    
                    ))
                }
             </div>
            <hr className="mr-4"/>
            <AddReview/>
        </div>
    )
}

export default ResturantDetail
