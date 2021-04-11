import React  from 'react'
import { useHistory, useParams } from 'react-router'
import resturantApis from '../apis/resturantApis';

const UpdateComp = (props) => {
    const {id} = useParams();
    const [name,setName] = React.useState("");
    const [location,setLocation] = React.useState("");
    const [price, setPrice] = React.useState('');
    let histroy = useHistory();
    React.useEffect(()=>{
        const fetchData = async()=>{
            try{
                const {data} = await resturantApis.get(`/resturants/${id}`);
                console.log(data[0]);
                setName(data[0].name)
                setLocation(data[0].location)
                setPrice(data[0].price_range)
            }
            catch(err){
                console.log(err);
            }
        }
        fetchData()
    },[id])
  
    const handleSubmit= async (e)=>{
        e.preventDefault();
        
        const updateResturant = await resturantApis.put(`/resturants/${id}`,{
            name,
            location,
            price_range: price
        })
        console.log(updateResturant);
        histroy.push('/');
    }
    return (
        <div className="container">
            <h1>{'lol'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    type="text" 
                    className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Location</label>
                    <input 
                    value={location}
                    onChange={e=> setLocation(e.target.value)}
                    type="text" 
                    className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Price Range</label>
                    <select 
                    value={price}
                    onChange={e=> setPrice(e.target.value)}
                    className="form-control"
                    name="price range" 
                    id="range">
                        <option value="">Select</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>
                <hr className="mr-4"/>
                <div className="btn-group">
                    <button 
                    type="submit"
                    className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateComp
