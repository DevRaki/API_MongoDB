const mongodb = require('mongodb');
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
        const result = await client.db('Demeter').collection('ventas').find().limit(20).toArray();
        if(result){
            response.success(req, res, "si hay ventas", 200)
        }
        else{
            response.error(req,res, "no hay compras wtf", 404);
        }
    }finally{
        await client.close()
    }

})
//insertOne
router.get('/registrar', async (req, res) =>{
    const client= new MongoClient(uri);
    const receta = new Object({
        ingrediente1 : 'lechuga',
        ingrediente2 : 'carne',
        ingrediente3 : 'pan',  
    })
    try{
        await client.connect()
        const result = await client.db('Demeter').collection('ventas').insertOne({
        producto : 'hamburguesa',
        precio : '20.10',
        fecha : '29/03/2023',
        insumos : receta,
        cantidad : 20,
        mesero : 'juan'
        });
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
        const receta = new Object({
            ingrediente1 : 'lechuga',
            ingrediente2 : 'carne',
            ingrediente3 : 'pan',  
        })
        await client.connect()
        const result = await client.db('Demeter').collection('ventas').insertMany([{
            producto : 'hamburguesa',
            precio : '20.10',
            fecha : '29/03/2023',
            insumos : receta,
            cantidad : 20,
            mesero : 'juan'
                
        },
        {
            producto : 'perro',
            precio : '20.10',
            fecha : '15/03/2023',
            insumos : receta,
            cantidad : 10,
            mesero : 'carlos'
            }]
        );
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
        const body = req.body;
        await client.connect()
        const result = await client.db('Demeter').collection('ventas').deleteOne({producto : 'hamburguesa'});
        if(result){
            response.success(req, res, "Se eliminaron los documentos", 200)
        }
        else{
            response.error(req,res, "no hay ventas wtf", 404);
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
        const result = await client.db('Demeter').collection('ventas').deleteMany({producto : 'hamburguesa'});
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
        const result = await client.db('Demeter').collection('ventas').updateOne(
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
        const result = await client.db('Demeter').collection('ventas').updateMany(
            {cantidad : 28},
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
