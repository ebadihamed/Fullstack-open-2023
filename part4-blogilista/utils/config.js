require('dotenv').config()
console.log(process.env.MONGODBURLTEST)
let PORT = 3003
const MONGODB_URL = process.env.NODE_ENV === 'test'
    ? process.env.MONGODBURLTEST
    : process.env.MONGODBURL
let SECRET = 'gh'
module.exports = {MONGODB_URL, PORT, SECRET}