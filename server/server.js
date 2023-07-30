require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose');
const api = require('./api/api_router');
const bodyParser = require('body-parser');
var cors = require('cors')

//connect to mongodb
const mongoDB = process.env.DATABASE_STRING;
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

//serve production build of react front
// app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))


app.use('/api', api);

app.listen('5000', () => { console.log('Server is running in port 5000') })