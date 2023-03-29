const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient, ObjectId} = require('mongodb');
const uri = ("mongodb+srv://Rios:elefante1@demeter.1ioyyf1.mongodb.net/?retryWrites=true&w=majority");

const response = require('./network/response');


app = express();
port  = 3000;

const routerApi = require('./routes');

routerApi(app);

app.use(bodyParser.json());
app.use(express.static('public'));



app.get('/', (rec, res) =>{
    res.status(200).send('funcionando');
    
})

app.listen(port, ()=>{
    console.log(`esta corriendo en http://localhost:${port}`)
})