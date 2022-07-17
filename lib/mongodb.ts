import { MongoClient } from "mongodb";
require('dotenv').config();

const mongoDBURL = process.env.MONGODB_URI;
let promiseClinet : Promise<MongoClient>;
const options = {};
if(typeof mongoDBURL ===  'string'){
    promiseClinet = new MongoClient(mongoDBURL, options).connect();
}
else {
    throw 'dotenv not working';
}
export default promiseClinet;
