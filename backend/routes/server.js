import express from "express"
import cors from "cors"
import axios from "axios"
import jsdom from "jsdom"
import dotenv from "dotenv"
import mongoose from "mongoose"
import expressAsyncHandler from "express-async-handler"
import seedRouter from './seedRoutes.js';
import userRouter from './userRoutes.js';
import data from "./data.js"

dotenv.config()
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

  const app= express()
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors())
  
  app.use('/api/seed', seedRouter);
  app.use('/api/users', userRouter);
  app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });




  app.get('/api/products', async (req, res)=>{
    res.send(data.products)
  })
  
  app.get('/api/products/delete/:id', async (req, res)=>{
    try {
      data.products =  data.products.filter((el) => {
        return el._id != req.params.id;
      })
      res.status(200).send({ message: 'product deleted' });
    } catch (err) {
      console.log(getError(err));
      res.status(401).send({ message: 'No product with this id' });
    }  
  })
  
    


// app.get('/api/products', (req, res)=>{
//     res.send(data.products)
// })
app.get('/api/product/slug/:slug', (req, res)=>{
    const product =  data.products.find(x=> x.slug == req.params.slug)
    if(product){
        res.send(product)
    }else{
        res.status(404).send({message: "Product NOT FOUND"})
    }
})

app.get('/api/products/:id', (req, res) => {
    const product = data.products.find((x) => {
        return x._id == req.params.id ?  x :  null
    });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  });


const port= process.env.PORT || 5000 

app.listen(port, ()=>{
    console.log(`serve at ${port}`);
})