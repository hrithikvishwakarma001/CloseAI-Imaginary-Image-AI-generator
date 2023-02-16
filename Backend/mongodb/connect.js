import { mongoose } from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

// const connectDB = (url) => {

//    mongoose.connect(url)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.log(err))
// }


const connectDB = mongoose.connect(process.env.MONGODB_URL);

export default connectDB;
