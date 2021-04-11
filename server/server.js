import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import resturantRouter from './routes/resturantRouter.js';
import cors from 'cors';
const app = express();
dotenv.config();

app.use(cors())

app.config= {
    port: process.env.PORT  || 5000
}

app.use(morgan('dev'));
app.use(express.json())

app.get('/', (req,res)=>{
    res.send('hello');
})

app.use('/resturants', resturantRouter);

app.listen(app.config.port, console.log(`server started at http://localhost:${app.config.port}`))