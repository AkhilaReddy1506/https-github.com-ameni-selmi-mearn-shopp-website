# mearn-shopp-website
Comparison shopping website
## dependencies
### Frontend
    "@mui/material": "^5.6.3",
    "axios": "^0.27.2",
    "react": "^18.1.0",
    "react-apexcharts": "^1.4.0",
    "react-bootstrap": "^2.3.0",
    "react-helmet-async": "^1.3.0",
    "react-toastify": "^9.0.1",
    "web-vitals": "^2.1.4"
### Backend
    "bcryptjs": "^2.4.3",
    "cheerio": "^1.0.0-rc.10",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.18.1",
    "express-async-handler": "^1.2.0",
    "jsdom": "^19.0.0",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.3.2",
    "puppeteer": "^13.7.0"
## Color palette :
  https://colorhunt.co/palette/006e7ff8cb2eee5007b22727

## Run Locally

### 1. Clone repo

```
$ git clone git@github.com:ameni-selmi/mearn-shopp-website.git
$ cd mearn-shopp-website
```

### 2. Create .env File

- duplicate .env.example in backend folder and rename it to .env

### 3. Setup MongoDB

- Local MongoDB
  - Install it from [here](https://www.mongodb.com/try/download/community)
  - In .env file update MONGODB_URI=mongodb://localhost/yourURL
- OR Atlas Cloud MongoDB
  - Create database at [https://cloud.mongodb.com](https://cloud.mongodb.com)
  - In .env file update MONGODB_URI=mongodb+srv://your-db-connection

### 4. Run Backend

```
$ cd backend
$ npm install
$ npm start
```

### 5. Run Frontend

```
# open new terminal
$ cd frontend
$ npm install
$ npm start
```


### 6. Admin Login

- Run http://localhost:3000/signin
- Enter admin email and password and click signin




## Screenshots
### Client interfaces
<table>
  <tr>
    <td>Sign in</td>
     <td>Sign up</td>
     <td>User menu</td>
  </tr>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/53795935/171238675-810127ad-ed15-4a1e-86b6-4a2bcef4f9c0.PNG" ></td>
    <td><img src="https://user-images.githubusercontent.com/53795935/171236319-7a1002fb-6b3b-4b26-b972-a2488ec22d7b.PNG" ></td>
    <td><img src="https://user-images.githubusercontent.com/53795935/171236323-2e545489-e870-498e-8e7b-b8c9a8d6f4f8.PNG" ></td>
  </tr>
 </table>

<table>
  <tr>
    <td>Home</td>
     <td>Products Screen</td>
  </tr>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/53795935/171236331-92fd4671-7114-4c6c-a321-672927c12a75.PNG" ></td>
    <td><img src="https://user-images.githubusercontent.com/53795935/171236308-b617c480-cf76-41dc-85ff-295dd2bc5f2d.PNG" ></td>
  </tr>
 </table>


<table>
  <tr>
    <td>Product Screen</td>
     <td>Cart Screen</td>
  </tr>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/53795935/171236307-a9317b7e-eec3-450b-8df5-aad60a7c136c.PNG" ></td>
    <td><img src="https://user-images.githubusercontent.com/53795935/171236330-ae41f8c5-f5a0-4dbf-a599-0d723cc8139d.PNG" ></td>
  </tr>
</table>

### Admin interfaces
<table>
  <tr>
    <td>Dashboard Screen</td>
     <td>Admin list</td>
     <td>Add admin</td>
  </tr>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/53795935/171236328-ba0eedaf-04d6-4683-b75b-495dbf2f7c35.PNG" ></td>
    <td><img src="https://user-images.githubusercontent.com/53795935/171236299-d479f2f8-ae77-4e58-9d13-d832380fcee6.PNG" ></td>
    <td><img src="https://user-images.githubusercontent.com/53795935/171237679-3970988c-953d-446f-a990-f07ae85e86b1.PNG"></td>
  </tr>
</table>






