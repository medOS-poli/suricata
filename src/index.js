'use strict' // directive. With strict mode, you can not, for example, use undeclared variables 

const express = require('express'); //import express from the modules
const parser = require('body-parser'); //to parse the body of posts
const mongoose = require('mongoose'); //use the db
const Product = require('./models/product');


const app = express();
const port = process.env.PORT || 3001 ;

app.use(parser.urlencoded({extended:false}));
app.use(parser.json()); //set json as default

// app.listen(port, () =>
// {
//     console.log(`API REST corriendo en http://localhost:${port}`)     
// });


mongoose.connect('mongodb://localhost:27017/shop',
                { useMongoClient: true },
                (err,res)=>
{
   
    if (err) return console.log(`Connection FAILED: ${err}`);
    
    console.log('Connection OK');
    app.listen(port, () =>
    {
    console.log(`API REST corriendo en http://localhost:${port}`)     
    });

    
});





/* REQUESTS */

app.get('/hola/', function (req, res)
{    
    res.set('Content-Type', 'text/html');
    res.send('<p>Use some /name</p>');

    
});

app.get('/hola/:name',(req,res)=>
{
    
//     res.set('Content-Type', 'text/html');

    var ref = req.params.name;
    if(ref.length > 3 && ref[ref.length-1]==='a')
        res.send({message: `Hola ${ref}`,status: 'okay'}); 
    else
//         res.json({ user: `${ref}` });
        res.send({employees:[
                {"firstName":"John", "lastName":"Doe"}, 
                {"firstName":"Anna", "lastName":"Smith"}, 
                {"firstName":"Peter", "lastName":"Jones"}]});

//     res.send([1,2,3]);
//     res.send(new Buffer('whoop'));
//     res.send({ some: 'json' });
//     res.send('<p>some html</p>');
//     res.status(404).send('Sorry, we cannot find that!');
//     res.status(500).send({ error: 'something blew up' });
    
});

app.get('/file/:name', function (req, res, next) {

  var options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = req.params.name;
  res.type('json');
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  });

});


/*PROJECT EXAMPLE*/

/*GET*/

app.get('/API/product/', (req,res)=> //returns all products
{
    Product.find({},(err,products) =>
    {
        if(err) return res.status(500).send({Error: `${err}`});
        if(!products)  return res.status(404).send({Error: `Not Products: ${err}`});
                 
        res.status(200).send({products});
    });
     
});

app.get('/API/product/:ID', (req,res)=>
{
    let productID = req.params.ID;
    
    Product.findById( productID, (err,product)=>
    {
        if(err) return res.status(500).send({Error: `${err}`});
        if(!product)  return res.status(404).send({Error: `Product does not exists ${err}`});
                     
        res.status(200).send({ product, Status: "OK" });
//         res.status(200).send({product: product});
                     
    });
});


/*POST*/
app.post('/API/product', (req,res)=>
{
//     console.log(req.body); //print the POST body
//     res.status(200).send({message: 'Producto recibido'});
//     res.status(404).send({message: 'Producto no recibido'});
    
    console.log('POST /API/PRODUCT/');
    console.log(req.body);
    
    let product = new Product();
    
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = req.body.category;
    product.description = req.body.description;
    
    product.save((err,productStored) =>
    {
        if(err) res.status(500).send({Error: `Couldn't saved the product: ${err}`});
    
        res.status(200).send({product: productStored});
        
    });

});

/*PUT*/

app.put('/API/product/:productID', (req,res)=>
{
    
    
});

/*DELETE*/

app.put('/API/product/:productID', (req,res)=>
{
    
    
});
