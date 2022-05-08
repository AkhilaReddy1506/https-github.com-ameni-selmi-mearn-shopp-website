// const dataLocal = {
//     products: [
//       {
//         _id :1 ,
//         name: 'laptop1',
//         slug: 'lap1' ,
//         category: 'Laptops',
//         image: '/images/p1.jpg', // 679px × 829px
//         price: 120,
//         countInStock: 10,
//         brand: 'HP',
//         rating: 4,
//         nbRating: 168 ,
//         description: 'Acer Aspire 1, 15.6" FHD, ICD N4020, 4GB RAM, 128GB eMMC, Windows 10S + Office 365, Black, A115-31-C9K3',
//         ram : "8 GB" ,
//         os	: "Windows 10 Home" ,
//         CPU : "Core i5" ,
//         screen : "size	19 Inches" ,
//         disk : "HDD 7200 rpm" ,
//       },
//       {
//         _id :2 ,
//         name: 'desktop1',
//         slug: 'des1' ,
//         category: 'Desktops',
//         image: '/images/p2.jpg', // 679px × 829px
//         price: 120,
//         countInStock: 10,
//         brand: 'HP',
//         rating: 3.5,
//         nbRating: 168 ,
//         description: 'Acer Aspire 1, 15.6" FHD, ICD N4020, 4GB RAM, 128GB eMMC, Windows 10S + Office 365, Black, A115-31-C9K3',
//         ram : "8 GB" ,
//         os	: "Windows 10 Home" ,
//         CPU : "Core i5" ,
//         screen : "size	19 Inches" ,
//         disk : "HDD 7200 rpm" ,
//       },
//       {
//         _id :3 ,
//         name: 'smatphone1',
//         slug: 'sma1' ,
//         category: 'Smartphones',
//         image: '/images/p3.jpg', // 679px × 829px
//         price: 120,
//         countInStock: 10,
//         brand: 'HP',
//         rating: 2.5,
//         nbRating: 168 ,
//         description: 'Acer Aspire 1, 15.6" FHD, ICD N4020, 4GB RAM, 128GB eMMC, Windows 10S + Office 365, Black, A115-31-C9K3',
//         ram : "8 GB" ,
//         os	: "Windows 10 Home" ,
//         CPU : "Core i5" ,
//         screen : "size	19 Inches" ,
//         disk : "HDD 7200 rpm" ,
//       },
//       {
//         _id :4 ,
//         name: 'monitor1',
//         slug: 'moni1' ,
//         category: 'Monitors',
//         image: '/images/p4.jpg', // 679px × 829px
//         price: 120,
//         countInStock: 10,
//         brand: 'HP',
//         rating: 4.5,
//         nbRating: 168 ,
//         description: 'Acer Aspire 1, 15.6" FHD, ICD N4020, 4GB RAM, 128GB eMMC, Windows 10S + Office 365, Black, A115-31-C9K3',
//         ram : "8 GB" ,
//         os	: "Windows 10 Home" ,
//         CPU : "Core i5" ,
//         screen : "size	19 Inches" ,
//         disk : "HDD 7200 rpm" ,
//       },
//     ],
//   };
//   export default dataLocal;

import axios from "axios"
import jsdom from "jsdom";


const getHTML = async (URL) => {
  try {
    return await axios.get(URL)
  } catch (error) {
    console.error(error)
  }
}

const getItem = async (link, tags )=>{
  try {
    var htmlLink = await getHTML(link)
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
const getItemFromTable = async(link, tags, index )=>{
 try {
  var htmlLink = await getHTML(link)
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
const scrape = async () => {
  var data = {}
  data['products']=[]
  const html = await getHTML('https://www.mytek.tn/informatique/ordinateurs-portables/pc-portable.html?p=3')
  const dom = new jsdom.JSDOM(html.data);
  
  var elemImg =  dom.window.document.querySelectorAll(".product-image-wrapper img"); 
  var images=[]
  elemImg.forEach(function(item) {
      images.push(item.src)
  });
  
  var nbProducts = parseInt(dom.window.document.querySelector(".toolbar-number").textContent)
  var product={}
  var _id=0
  var elemLink =  dom.window.document.querySelectorAll(".product-item-link");
  elemLink.forEach(async (item)=> {
    // links.push(item.href)
    var link = item.href
    if(link.length>0){
      let name= await getItem(link, ".page-title span")
      name = name ?  name.textContent : 'not mentioned'
      let slug= await getItem(link, ".sku .value ")
      slug = slug ?  slug.textContent : 'not mentioned'
      let price= await getItem(link, ".product-info-main .price-box .price")
      price = price ?  price.textContent : 'not mentioned'
      let brand= await getItem(link, ".amshopby-option-link img")
      brand = brand ?  brand.title : 'not mentioned'
      let stock= await getItem(link, ".available span")
      stock = stock ?  stock.textContent : 'not mentioned'
      let description= await getItem(link, ".value p")
      description = description ?  description.textContent : 'not mentioned'
      let ram = await getItemFromTable(link, ".data td", 2)
      ram = ram ?  ram.textContent : 'not mentioned'
      let os = await getItemFromTable(link, ".data td", 5)
      os = os ?  os.textContent : 'not mentioned'
      let CPU = await getItemFromTable(link, ".data td", 1)
      CPU = CPU ?  CPU.textContent : 'not mentioned'
      let screen = await getItemFromTable(link, ".data td", 6)
      screen = screen ?  screen.textContent : 'not mentioned'
      let disk = await getItemFromTable(link, ".data td", 7)
      disk = disk ?  disk.textContent : 'not mentioned'
      console.log("finish");
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
      }
        data.products.push(product)
        _id++      
        console.log('data=', data);
  }
  });  
  

  var elemName =  dom.window.document.querySelectorAll(".stock");
  var names=[]
  elemName.forEach(function(item) {
      names.push(item.href)
  });
}

scrape()
