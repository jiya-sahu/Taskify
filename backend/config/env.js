import dotenv from 'dotenv';

dotenv.config();

export const env = {
    port : process.env.PORT || 5050,
    mongodbUri : process.env.MONGODB_URI || 'mongodb://localhost:27017/taskify',
    nodeEnv : process.env.NODE_ENV || 'development',
    jwtAccessToken : process.env.JWT_ACCESS_TOKEN || 'your_access_secret',
    jwtRefreshToken : process.env.JWT
}



