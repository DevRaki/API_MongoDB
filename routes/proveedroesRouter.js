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
        const result = await client.db('Demeter').collection('proveedores').find().limit(20).toArray();
        if(result){
            response.success(req, res, "si hay proveedores", 200)
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
        const result = await client.db('Demeter').collection('proveedores').insertOne({
            nombre : 'samuel',
            apellido : 'rios',
            documento : 103921,
            insumo : 'carnes',
            ciudad : 'medellin',
            telefono : 30131894
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
        await client.connect()
        const result = await client.db('Demeter').collection('proveedores').insertMany([{
            nombre : 'samuel',
            apellido : 'rios',
            documento : 103921,
            insumo : 'carnes',
            ciudad : 'medellin',
            telefono : 30131894
                
        },
        {
            nombre : 'carlos',
            apellido : 'gusman',
            documento : 104121,
            insumo : 'panes',
            ciudad : 'medellin',
            telefono : 30241594
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
        const result = await client.db('Demeter').collection('proveedores').deleteOne({documento : 104121});
        if(result){
            response.success(req, res, "Se eliminaron los documentos", 200)
        }
        else{
            response.error(req,res, "no hay proveedores wtf", 404);
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
        const result = await client.db('Demeter').collection('proveedores').deleteMany({insumo: "Mouse"});
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
        const result = await client.db('Demeter').collection('proveedores').updateOne(
            {documento : 104121},
            {$set: {insumo : "carnes"}   
            
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
        const result = await client.db('Demeter').collection('proveedores').updateMany(
            {documento : 104121},
            {$set: {document : 00000}   
            
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
