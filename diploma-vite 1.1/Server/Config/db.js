import mongoose from 'mongoose';

const URL = 'mongodb://localhost:27017/MyDB'

const connectDB = async() => {
    try{
        await mongoose.connect(URL)
        console.log('Connected to MongoDB');
    }
    catch(error){
        console.log(`DB connection error: ${error}`);
        process.exit(1);
    }
}
export default connectDB;