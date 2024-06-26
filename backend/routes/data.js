import bcrypt from 'bcryptjs'
import axios from "axios"
import jsdom from "jsdom"

const getHTML = async (URL) => {
  try {
    return await axios.get(URL)
  } catch (error) {
    console.error(error)
  }
}
const getItem = async (htmlLink, tags )=>{
  try {
    if(htmlLink){
      return new Promise((resolve, reject) => { 
        var domx = new jsdom.JSDOM(htmlLink.data)
        var elem =  domx.window.document.querySelectorAll(tags)
        elem.forEach(function(item) {
          // console.log('fn=', item.textContent);
          resolve(item);
            })
        })
    }
  } catch (error) {
    console.log(error);
  }
}
const getItemFromTable = async(htmlLink, tags, index )=>{
 try {
  if(htmlLink){
    return new Promise((resolve, reject) => { 
      var domx = new jsdom.JSDOM(htmlLink.data)
      var elem =  domx.window.document.querySelectorAll(tags)
        resolve(elem[index]);
      })
  }
 } catch (error) {
   console.log(error);
 }
}


export const scrapeSmartphone = async (p)=>{
  const html = await getHTML(`https://www.mytek.tn/telephonie-tunisie/smartphone-mobile-tunisie/smartphone-tunisie.html?p=${p}`)
  return new Promise((resolve, reject) => { 
  try {
    var data = {}
    data['products']=[]
    var _id=0+p*10
    var elemLinkLength=0
    var count=0 
    var timeout=false
    var timer = setTimeout(()=>{
      // res.send(data)
      timeout=true
      console.log('finish from time out', p);
        resolve(data.products);
    }, 100000)
    const  execCallback = ()=>{
      count++
      if(count >= elemLinkLength && !timeout){
        clearTimeout(timer)
        // res.send(data)
        console.log('finish from callback', p);
          resolve(data.products);
      }
      console.log('count=', count);
    }
  
      const dom = new jsdom.JSDOM(html.data);
    //get images from url  
    var elemImg =  dom.window.document.querySelectorAll(".product-image-wrapper img"); 
    var images=[]
    elemImg.forEach(function(item) {
        images.push(item.src)
    });
    
    // var nbProducts = parseInt(dom.window.document.querySelector(".toolbar-number").textContent)
    var product={}
    var elemLink =  dom.window.document.querySelectorAll(".product-item-link");
    elemLinkLength+= elemLink.length
    elemLink.forEach(async (item, index)=> {
      var link = item.href
      if(link.length>0){
        var htmlLink = await getHTML(link)
        let name= await getItem(htmlLink, ".page-title span")
        name = name ?  name.textContent : 'not mentioned'
        let slug= await getItem(htmlLink, ".sku .value ")
        slug = slug ?  slug.textContent : 'not mentioned'
        let price= await getItem(htmlLink, ".product-info-main .price-box .price")
        price = price ?  price.textContent : 'not mentioned'
        let brand= await getItem(htmlLink, ".amshopby-option-link img")
        brand = brand ?  brand.title : 'not mentioned'
        let stock= await getItem(htmlLink, ".available span")
        stock = stock ?  stock.textContent : 'not mentioned'
        let description= await getItem(htmlLink, ".value p")
        description = description ?  description.textContent : 'not mentioned'
        let ram = await getItemFromTable(htmlLink, ".data td", 3)
        ram = ram ?  ram.textContent : 'not mentioned'
        let os = await getItemFromTable(htmlLink, ".data td", 5)
        os = os ?  os.textContent : 'not mentioned'
        let CPU = await getItemFromTable(htmlLink, ".data td", 2)
        CPU = CPU ?  CPU.textContent : 'not mentioned'
        let screen = await getItemFromTable(htmlLink, ".data td", 6)
        screen = screen ?  screen.textContent : 'not mentioned'
        let disk = await getItemFromTable(htmlLink, ".data td", 1)
        disk = disk ?  disk.textContent : 'not mentioned'
        product ={
          _id :_id ,
          name: name,
          slug: slug,
          category: 'smartphone',
          image: images[_id-10*p],//await getItem(link, ".fotorama__loaded--img img").src, // 679px × 829px
          price: price,
          countInStock: Math.floor(Math.random() * (50 + 1)),
          stock : stock ,
          brand: brand,
          rating: Math.floor(Math.random() * (5 + 1)),
          nbRating: Math.floor(Math.random() * (700 + 1)) ,
          description: description,
          ram : ram,
          os	: os,
          CPU : CPU,
          screen : screen,
          disk : disk,
          link : link,
        }
          data.products.push(product)
          _id++      
          // console.log('data=',index , elemLink.length-1 )
          execCallback() ;
    }
  
    }); 
    
  } catch (error) {
    console.log(error);  
  }
})
}

export const scrapeLaptop = async (p)=>{
  const html = await getHTML(`https://www.mytek.tn/informatique/ordinateurs-portables/pc-portable.html?p=${p}`)
  return new Promise((resolve, reject) => { 
  try {
    var data = {}
    data['products']=[]
    var _id=0+p*100
    var elemLinkLength=0
    var count=0 
    var timeout=false
    var timer = setTimeout(()=>{
      timeout=true
      console.log('finish from time out', p);
        resolve(data.products);
    }, 50000)
    const  execCallback = ()=>{
      count++
      if(count >= elemLinkLength && !timeout){
        clearTimeout(timer)
        console.log('finish from callback', p);
          resolve(data.products);
      }
      console.log('count=', count);
    }
  
      const dom = new jsdom.JSDOM(html.data);
    //get images from url  
    var elemImg =  dom.window.document.querySelectorAll(".product-image-wrapper img"); 
    var images=[]
    elemImg.forEach(function(item) {
        images.push(item.src)
    });
    
    // var nbProducts = parseInt(dom.window.document.querySelector(".toolbar-number").textContent)
    var product={}
    var elemLink =  dom.window.document.querySelectorAll(".product-item-link");
    elemLinkLength+= elemLink.length
    elemLink.forEach(async (item, index)=> {
      var link = item.href
      if(link.length>0){
        var htmlLink = await getHTML(link)
        let name= await getItem(htmlLink, ".page-title span")
        name = name ?  name.textContent : 'not mentioned'
        let slug= await getItem(htmlLink, ".sku .value ")
        slug = slug ?  slug.textContent : 'not mentioned'
        let price= await getItem(htmlLink, ".product-info-main .price-box .price")
        price = price ?  price.textContent : 'not mentioned'
        let brand= await getItem(htmlLink, ".amshopby-option-link img")
        brand = brand ?  brand.title : 'not mentioned'
        let stock= await getItem(htmlLink, ".available span")
        stock = stock ?  stock.textContent : 'not mentioned'
        let description= await getItem(htmlLink, ".value p")
        description = description ?  description.textContent : 'not mentioned'
        let ram = await getItemFromTable(htmlLink, ".data td", 2)
        ram = ram ?  ram.textContent : 'not mentioned'
        let os = await getItemFromTable(htmlLink, ".data td", 5)
        os = os ?  os.textContent : 'not mentioned'
        let CPU = await getItemFromTable(htmlLink, ".data td", 1)
        CPU = CPU ?  CPU.textContent : 'not mentioned'
        let screen = await getItemFromTable(htmlLink, ".data td", 6)
        screen = screen ?  screen.textContent : 'not mentioned'
        let disk = await getItemFromTable(htmlLink, ".data td", 7)
        disk = disk ?  disk.textContent : 'not mentioned'
        product ={
          _id :_id ,
          name: name,
          slug: slug,
          category: 'Laptops',
          image: images[_id-100*p],//await getItem(link, ".fotorama__loaded--img img").src, // 679px × 829px
          price: price,
          countInStock: Math.floor(Math.random() * (50 + 1)),
          stock : stock ,
          brand: brand,
          rating: Math.floor(Math.random() * (5 + 1)),
          nbRating: Math.floor(Math.random() * (700 + 1)) ,
          description: description,
          ram : ram,
          os	: os,
          CPU : CPU,
          screen : screen,
          disk : disk,
          link : link,
        }
          data.products.push(product)
          _id++      
          // console.log('data=',index , elemLink.length-1 )
          execCallback() ;
    }
  
    }); 
    
  } catch (error) {
    console.log(error);  
  }
})
}


var products1 = await scrapeLaptop(1)
var products2 = await scrapeLaptop(2)
var products3 = await scrapeSmartphone(1)
var products4 = await scrapeSmartphone(2)
var products5 = await scrapeSmartphone(3)
var products6 = await scrapeSmartphone(4)

var prods= [...products1, ...products3, ...products4, ...products2, ...products5, ...products6]
const data = {
    users: [
      {
        name: 'selmi',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: true,
      },
      {
        name: 'ameni',
        email: 'user@example.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
      },
    ],
    products:  prods
  };
  export default data;