import express from 'express';
import cookieParser from 'cookie-parser';
import errorHandleMiddleware from './middleware/errors.js'
import user from './routes/userRoutes.js';
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename)


const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:"http://localhost:5173", credentials:true}))

//Routes
app.use("/api/v1",user)

app.use(express.static(path.join(__dirname,'../frontend/dist')));

app.get("*",(req,res)=> {
    res.sendFile(path.resolve(__dirname,'../frontend/dist/index.html'))
})

app.use(errorHandleMiddleware);

export default app;