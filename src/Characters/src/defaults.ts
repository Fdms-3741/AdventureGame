import dotenv from 'dotenv'

/* Get defined environment variables in the default folder */
dotenv.config()

const MONGODB_ADDRESS = "mongodb://" + process.env.MONGODB_USER + ":" + process.env.MONGODB_PASSWORD + "@" +process.env.MONGODB_HOST
const MONGODB_TEST_ADDRESS = MONGODB_ADDRESS + "/tests?authSource=yourDB&w=1"
export {MONGODB_ADDRESS,MONGODB_TEST_ADDRESS}