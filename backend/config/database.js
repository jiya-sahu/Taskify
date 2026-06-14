import mongoose from 'mongoose'
import {env} from './env.js'
import logger from '../utils/logger.js'

const connectDB = async ()=>{
    try {
        await mongoose.connect(env.mongodbUri);
        logger.info("MongoDB connected successfully");
    } catch (error) {
        logger.error(`MongoDB connection failed : ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;