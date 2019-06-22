var express = require('express');
const dotenv =require('dotenv');
const mongoose = require ('mongoose');
const morgan = require("morgan");
const bodyParser = require('body-parser');
const cookieParser = require ("cookie-parser");
const expressValidator=require('express-validator');
const fs = require ('fs');
const cors = require('cors')

var app = express()

//bring in routes
// const {getPosts} = require('./routes/post')
const postRoutes =require('./routes/post')
const authRoutes =require('./routes/auth')
const userRoutes =require('./routes/user')


dotenv.config()


//db
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true })
.then(() =>console.log('DB connected'))

mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`);
})

 

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser ());
app.use(expressValidator());
app.use(cors());
app.use('/', postRoutes); // A request to '/' gets passed to the 'Routes' folder, and from there subsequently to 'Controllers'
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error: 'Unauthorised'});
  }
});
app.get('/', (req,res)=>{
  fs.readFile('docs/api.json', (err,data)=>{
    if(err){
      res.status(400).json({
        error: err
      })
    }
    const docs = JSON.parse(data)
    res.json(docs);
  })
})



const port =process.env.PORT || 8080;
app.listen(port, ()=> {console.log(`The API is listening on port: ${port}`)})


// console.log("test test test")
// const fs =require('fs')
// const filename = "target.txt"
// const errHandler =err =>console.log(err);
// const dataHandler =data => console.log(data.toString());
// fs.watch(filename, ()=>console.log('File Changed'))
// fs.readFile(filename,(err,data)=> {
// if(err){
//   errHandler(err)
// }
//  dataHandler(data);
// })
// console.log('Node js');
//node.js secrets
//functions//callbacks
//event loop continuously runs
//async (non-blocking)
