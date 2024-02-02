import 'dotenv/config';

export default {
    NODE_ENV: process.env.NODE_ENV || 'dev',
    PORT: process.env.PORT || 8080,
    MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL || "mongodb+srv://andrewcei:s572i7TVIKEr8PfK@codercluster.xwoiiio.mongodb.net/?retryWrites=true&w=majority",
    MONGO_LOCAL_URL: process.env.MONGO_LOCAL_URL
}
