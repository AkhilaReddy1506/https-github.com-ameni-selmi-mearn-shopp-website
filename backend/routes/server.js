import express from "express"
import dataLocal from "./data.js"
import cors from "cors"


const app= express()
app.use(cors())

// app.get('/api/test', (req, res)=>{
//     res.send(getAmazonPrice())
// })

app.get('/api/products', (req, res)=>{
    res.send(data.products)
})
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