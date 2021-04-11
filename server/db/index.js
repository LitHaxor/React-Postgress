import pkg from 'pg';
const {Pool,Client}= pkg;


const pool = new Pool();

const app = {
    query: (text, params)=> pool.query(text,params),
}

export default app;
