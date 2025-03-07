import mongoose from 'mongoose';

export const connectMongoDatabase =async()=> {
   try {
    const conn= await mongoose.connect(process.env.DB_URL);
    console.log(`MongoDB connected with serverP: ${conn.connection.host}`)

   } catch(err){
    console.log(`Error connection to MongoDB ${err.message}`)
    process.exit(1)

   } 
}