import express from 'express';
import resturantMiddleware from '../middlewares/resturantMiddleware.js';
import db from '../db/index.js';

const resturantRouter = express.Router();

resturantRouter.use(resturantMiddleware);

resturantRouter.get('/', async (req,res)=>{
   try{
    const {rows}= await db.query("SELECT * FROM resturants LEFT JOIN (SELECT resturant_id,COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews group by resturant_id) reviews ON resturants.id = reviews.resturant_id;");
    res.status(200).send(rows);
    
   } 
   catch(error){
        console.log(error);
   }
})

resturantRouter.get('/:id', async(req,res)=>{
    const id = req.params.id;
    try{
        const {rows} = await db.query("SELECT * FROM resturants LEFT JOIN (SELECT resturant_id,COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews group by resturant_id) reviews ON resturants.id = reviews.resturant_id where resturants.id=$1;", [id]);
        const reviews = await db.query("SELECT * FROM reviews WHERE resturant_id=$1",[id]);
        res.status(200).json({
            resturants: rows[0],
            reviews: reviews.rows
        });
    }
    catch(error){console.log(error);}

} );



resturantRouter.post('/', async (req,res)=>{
    const {name,location, price_range} = req.body;
    try{
        const {rows} = await db.query("INSERT INTO resturants (name, location,price_range) VALUES ($1,$2,$3) returning *",[name,location,price_range]);
        res.status(201).json({
            status: 'successs',
            data: rows
        })
    } catch(error){
        console.log(error);
    }
})

resturantRouter.put('/:id', async (req,res)=>{
    const {name, location,price_range} = req.body;
    const id = req.params.id;
    try{
        const {rows} = await db.query("UPDATE resturants SET name=$1, location=$2, price_range=$3 WHERE id=$4 returning *",[name, location, price_range, id]);
        res.status(201).json({
            status: 'success',
            resturant: rows[0]
        })
    } catch(err){console.log(err);}
})

resturantRouter.post('/:id/review',async (req,res)=>{
    const {name, rating, review}= req.body;
    const {id} = req.params;
    try{
        const data = await db.query("INSERT INTO reviews (resturant_id, name,review, rating) VALUES ($1, $2,$3, $4) returning *;",[
            id,
            name,
            review,
            rating
        ]);
        console.log(data);
        res.status(201).json({
            status: 'success',
            data: data
        })
    }catch(err){console.log(err)}
})

resturantRouter.delete('/:id', async (req,res)=>{
    const id = req.params.id;
    try{
        const results = await db.query("DELETE FROM resturants WHERE id=$1", [id]);
        res.status(200).json({
            status: 'successs'
        })
    }
    catch(error){
        console.log(error);
    }
})

export default resturantRouter; 