import app from './app.js';
import dotenv from 'dotenv';
if(process.env.NODE_ENV==='development'){
dotenv.config({path: 'backend/config/config.env'});
}
import { connectMongoDatabase } from './config/db.js';

const port = process.env.PORT || 3000

app.listen(port,()=> {
    connectMongoDatabase()
    console.log(`Server is running in port ${port}`);
}) 