import dotenv from 'dotenv';

dotenv.config();

export const env = {
    port : process.env.PORT || 5050,
    mongodbUri : process.env.MONGODB_URI || 'mongodb://localhost:27017/taskify',
    nodeEnv : process.env.NODE_ENV || 'development',
    jwtAccessToken : process.env.JWT_ACCESS_TOKEN ,
    jwtRefreshToken : process.env.JWT_REFRESH_TOKEN ,
    jwtAccessExpiresIn : process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    jwtRefreshExpiresIn : process.env.JWT_REFRESH_EXPIRES_IN || '7d',
}



