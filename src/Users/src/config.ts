import dotenv from 'dotenv'

dotenv.config();

const SERVER_HOSTNAME = process.env.MICROSSERVICE_USERS || 'localhost';
const SERVER_PORT = '3000';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
}

const TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME || 3600;
const TOKEN_SECRET = process.env.TOKEN_SECRET || "vmsirnbspmacmsdopvmseopfm";

const TOKEN = {
    expireTime: TOKEN_EXPIRE_TIME,
    secret: TOKEN_SECRET
}

const MONGODB_ADDRESS = 'mongodb://' + process.env.MONGODB_USER + ":" + process.env.MONGODB_PASSWORD + "@" + process.env.MONGODB_USERS_HOST
const MONGODB_TEST_ADDRESS = MONGODB_ADDRESS + "tests?authSource=admin&w=1"
const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    autoIndex: false,
    retryWrites: true
}




const MONGO = {
    test: MONGODB_TEST_ADDRESS,
    url: MONGODB_ADDRESS,
    options: MONGO_OPTIONS
}

const config = {
    server: SERVER,
    mongo: MONGO,
    token: TOKEN
}

export default config;