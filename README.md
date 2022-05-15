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
