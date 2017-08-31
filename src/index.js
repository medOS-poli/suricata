'use strict'

const express = require('express') //import express from the modules
const parser = require('body-parser')

const app = express()
const port = process.env.PORT || 3001

app.use(parser.urlencoded({extended:false}))
app.use(parser.json())

app.get('/hola/:name',(req,res)=>
{
    res.send({message: `HOla ${req.params.name}`})
})

app.listen(port, () =>
{
    console.log(`API REST corriendo en http://localhost:${port}`)     
})
