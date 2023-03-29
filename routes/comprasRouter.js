
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Rios:elefante1@demeter.1ioyyf1.mongodb.net/?retryWrites=true&w=majority"

const response = require('../network/response.js');

router = express.Router();


// find
router.get('/', async (req, res) =>{
    const client= new MongoClient(uri);
    try{
        await client.connect()
        const result = await client.db('Demeter').collection('compras').find().limit(20).toArray();
        //res.status(200).send(result)
        if(result){
            response.success(req, res, "si hay copras", 200)
        }
        else{
            response.error(req,res, "no hay compras wtf", 404);
        }
    }finally{
        await client.close()
    }

})
//insertOne
router.post('/registrar', async (req, res) =>{
    const client= new MongoClient(uri);
    try{
        const body = req.body;
        await client.connect()
        const result = await client.db('Demeter').collection('compras').insertOne(body);
        if(result){
            response.success(req, res, "insertado", 200)
        }
        else{
            response.error(req,res, "no hay compras wtf", 404);
        }
    }finally{
        await client.close()
    }

})


//insertMany
router.get('/registrarVarios', async (req, res) =>{
    const client= new MongoClient(uri);
    try{
        await client.connect()
        const result = await client.db('Demeter').collection('compras').insertMany([{
            
            producto : "papa",
            precio : "20.20",
            fecha : "10/03/05",
            lote :  23,
            cantidad : 2
                
        },
        {
            producto : "arroz",
            precio : "10.2",
            fecha : "10/03/05",
            lote :  22,
            cantidad : 1
            }]
            );
        //res.status(200).send(result)
        if(result){
            response.success(req, res, "Registrados Correctamente", 200)
        }
        else{
            response.error(req,res, "no hay compras wtf", 404);
        }
    }finally{
        await client.close()
    }

})

//DeleteOne
router.get('/Eliminar', async (req, res) =>{
    const client= new MongoClient(uri);
    try{
        await client.connect()
        const result = await client.db('Demeter').collection('compras').deleteOne();
        //res.status(200).send(result)
        if(result){
            response.success(req, res, "Se eliminaron los documentos", 200)
        }
        else{
            response.error(req,res, "no hay compras wtf", 404);
        }
    }finally{
        await client.close()
    }
})

//DeleteMany

router.get('/EliminarVarios', async (req, res) =>{
    const client= new MongoClient(uri);
    try{
        await client.connect()
        const result = await client.db('Demeter').collection('compras').deleteMany({producto : 'papa'});
        //res.status(200).send(result)
        if(result){
            response.success(req, res, "Se eliminaron los documentos", 200)
        }
        else{
            response.error(req,res, "no hay compras wtf", 404);
        }
    }finally{
        await client.close()
    }
})



//updateOne

router.get('/actualizar', async (req, res) =>{
    const client= new MongoClient(uri);
    try{
        await client.connect()
        const result = await client.db('Demeter').collection('compras').updateOne(
            {producto : 'papa'},
            {$set: {precio : "30.30"}   
            
            }
        )

        if(result){
            response.success(req, res, "se actualizo los documentos", 200)
        }
        else{
            response.error(req,res, "no hay compras wtf", 404);
        }
    }finally{
        await client.close()
    }
})

//updateMany

router.get('/actualizarVarios', async (req, res) =>{
    const client= new MongoClient(uri);
    try{
        await client.connect()
        const result = await client.db('Demeter').collection('compras').updateMany(
            {producto : 'papa'},
            {$set: {precio : "30.30"}   
            
            }
        )

        if(result){
            response.success(req, res, "se actualizaron los documentos", 200)
        }
        else{
            response.error(req,res, "no hay compras wtf", 404);
        }
    }finally{
        await client.close()
    }
})

module.exports = router;
