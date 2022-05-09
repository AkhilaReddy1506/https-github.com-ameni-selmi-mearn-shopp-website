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



const scrape = async (p)=>{
  const html = await getHTML(`https://www.mytek.tn/informatique/ordinateurs-portables/pc-portable.html?p=${p}`)
  return new Promise((resolve, reject) => { 
  try {
    var data = {}
    data['products']=[]
    var _id=0
    var elemLinkLength=0
    var count=0 
    var timeout=false
    var timer = setTimeout(()=>{
      // res.send(data)
      timeout=true
      console.log('finish');
      resolve(data.products);
    }, 50000)
    const  execCallback = ()=>{
      count++
      if(count >= elemLinkLength && !timeout){
        clearTimeout(timer)
        // res.send(data)
        console.log('finish');
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
          image: images[_id],//await getItem(link, ".fotorama__loaded--img img").src, // 679px × 829px
          price: price,
          countInStock: 10,
          stock : stock ,
          brand: brand,
          rating: 4,
          nbRating: 168 ,
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
    products: await scrape(1)
    // [
    //   {
    //     _id :1 ,
    //     name: 'laptop1',
    //     slug: 'lap1' ,
    //     category: 'Laptops',
    //     image: '/images/p1.jpg', // 679px × 829px
    //     price: 120,
    //     countInStock: 10,
    //     brand: 'HP',
    //     rating: 4,
    //     nbRating: 168 ,
    //     description: 'Acer Aspire 1, 15.6" FHD, ICD N4020, 4GB RAM, 128GB eMMC, Windows 10S + Office 365, Black, A115-31-C9K3',
    //     ram : "8 GB" ,
    //     os	: "Windows 10 Home" ,
    //     CPU : "Core i5" ,
    //     screen : "size	19 Inches" ,
    //     disk : "HDD 7200 rpm" ,
    //   },
    //   {
    //     _id :2 ,
    //     name: 'desktop1',
    //     slug: 'des1' ,
    //     category: 'Desktops',
    //     image: '/images/p2.jpg', // 679px × 829px
    //     price: 120,
    //     countInStock: 10,
    //     brand: 'HP',
    //     rating: 3.5,
    //     nbRating: 168 ,
    //     description: 'Acer Aspire 1, 15.6" FHD, ICD N4020, 4GB RAM, 128GB eMMC, Windows 10S + Office 365, Black, A115-31-C9K3',
    //     ram : "8 GB" ,
    //     os	: "Windows 10 Home" ,
    //     CPU : "Core i5" ,
    //     screen : "size	19 Inches" ,
    //     disk : "HDD 7200 rpm" ,
    //   },
    //   {
    //     _id :3 ,
    //     name: 'smatphone1',
    //     slug: 'sma1' ,
    //     category: 'Smartphones',
    //     image: '/images/p3.jpg', // 679px × 829px
    //     price: 120,
    //     countInStock: 10,
    //     brand: 'HP',
    //     rating: 2.5,
    //     nbRating: 168 ,
    //     description: 'Acer Aspire 1, 15.6" FHD, ICD N4020, 4GB RAM, 128GB eMMC, Windows 10S + Office 365, Black, A115-31-C9K3',
    //     ram : "8 GB" ,
    //     os	: "Windows 10 Home" ,
    //     CPU : "Core i5" ,
    //     screen : "size	19 Inches" ,
    //     disk : "HDD 7200 rpm" ,
    //   },
    //   {
    //     _id :4 ,
    //     name: 'monitor1',
    //     slug: 'moni1' ,
    //     category: 'Monitors',
    //     image: '/images/p4.jpg', // 679px × 829px
    //     price: 120,
    //     countInStock: 10,
    //     brand: 'HP',
    //     rating: 4.5,
    //     nbRating: 168 ,
    //     description: 'Acer Aspire 1, 15.6" FHD, ICD N4020, 4GB RAM, 128GB eMMC, Windows 10S + Office 365, Black, A115-31-C9K3',
    //     ram : "8 GB" ,
    //     os	: "Windows 10 Home" ,
    //     CPU : "Core i5" ,
    //     screen : "size	19 Inches" ,
    //     disk : "HDD 7200 rpm" ,
    //   },
    // ],
  };
  export default data;