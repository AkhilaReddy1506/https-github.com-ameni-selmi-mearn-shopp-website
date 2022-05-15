import * as React from 'react';
import { useEffect, useReducer, useState, useContext } from 'react'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import Product from './Product.old'
import logger from 'use-reducer-logger'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import  AlertTitle  from '@mui/material/AlertTitle'; 
import {Helmet} from 'react-helmet-async'
import { FormControl, ImageListItemBar, InputLabel, MenuItem, Pagination, Rating, Select } from '@mui/material';
import { Store } from '../store'


const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true }
      case 'FETCH_SUCCESS':
        return { ...state, data: action.payload, loading: false }
      case 'FETCH_FAIL':
        return { ...state, error: action.payload, loading: false }
      default:
        return state
    }
  }
  

const theme = createTheme();

export default function Products() {
 
    const [{ loading, error, data }, dispatch] = useReducer(logger(reducer), {
        data: [],
        loading: true,
        error: '',
      })
      
      const [category, setCategory] = React.useState('');
      const [products, setProducts] = React.useState(data);
      useEffect(() => {
        const fetchData = async () => {
          // console.log('loading', loading);
          dispatch({ type: 'FETCH_REQUEST' })
          try {
            const result = await axios.get('http://localhost:5000/api/products')
            dispatch({ type: 'FETCH_SUCCESS', payload: 
                      result.data.sort((a, b) => 
                        parseFloat(a.price) - parseFloat(b.price)
                                      )})
            setProducts(result.data)
          } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: err.message })
          }
        }
    
        fetchData()
      }, [])

      const [page, setPage] = useState(1)

      const handleChange = (event) => {
        setCategory(event.target.value);
        setPage(1)
        switch (event.target.value) {
          case 0:
            setProducts(data)
            break;
          case 1:
            setProducts( data.filter((product)=> product.category == 'Laptops' ) )
            break;
          case 2:
            setProducts( data.filter((product)=> product.category == 'smartphone' ) )
            break; 
          // case 3:
          //   setProducts(data)
          //   break;       
          default:
            setProducts(data)
            break;
        }
      };
      
      
    return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Helmet>
        <title>Products</title>
      </Helmet>
      <main>
        {/* Hero unit */}
        <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 16, }} >
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
              Shop now
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Most common products nowdays
            </Typography>
            <Typography variant="h9" align="center" color="text.secondary" paragraph>
                Suscribe to our newsletter and get more featured
            </Typography>
            <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center" >
              <Link to="/signup">
                <Button style={{color: "#006E7F", border: "1px solid #006E7F"}} variant="outlined">Sign up</Button>
              </Link>
            </Stack>
          </Container>
        </Box>

        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <FormControl sx={{ mb: "5%",  width: "30%" }} >
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select 
                    labelId="Category"
                    id="Category"
                    value={category}
                    label="Category"
                    onChange={handleChange}
                >
                    <MenuItem value={0}>All category</MenuItem>
                    <MenuItem value={1}>Laptop</MenuItem>
                    <MenuItem value={2}>Smartphone</MenuItem>
                    <MenuItem value={3}>Monitor</MenuItem>
                </Select>
            </FormControl>
          <Grid container spacing={4}>
          {loading? 
          <div>
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={true} 
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>
      : error ? 
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
              {error}
        </Alert>
        :products.slice((page* 9 - 9), page*9).map((card) => (
                <Grid item key={card._id} xs={12} sm={6} md={4} >
                <Card className="Card"
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Link to={`/product/${card.slug}`}>
                      <CardMedia
                      component="img"
                      sx={{
                          // 16:9
                          pt: '15%',
                      }}
                      image={`${card.image}?w=248&fit=crop&auto=format`}
                      alt="random"
                      />
                    </Link>
                    <CardContent sx={{ flexGrow: 1 }}>
                    <Link to={`/product/${card.slug}`}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {card.name}
                        </Typography>
                    </Link>
                    <div className='product-descreption'>
                        <ImageListItemBar
                            subtitle={<span>by: {card.brand}</span>}
                            position="below"
                        />
                        <div className='rating'>
                        <Rating name="half-rating-read"  value={card.rating} precision={0.5} readOnly />
                        <span className='nb-rating'>{card.nbRating}</span>
                        </div>
                        <strong>$ {card.price}</strong>
                    </div>
                    <Typography>{card.description.substring(0, 150) + "...."}
                    </Typography>
                    </CardContent>
                    <CardActions>
                      <Link to={`/product/${card.slug}`}>
                          <Button style={{color: "#F8CB2E"}} size="small">View</Button>
                      </Link>
                      <Button style={{backgroundColor: "#F8CB2E"}} size="small" variant="contained" onClick={event =>  window.location.href= card.link }>
                          Buy now
                      </Button>
                    </CardActions>
                </Card>
                </Grid>
            ))
            }
          </Grid>
          <Pagination onChange={(e, value) => setPage(value)} 
              page={page}
              sx={{ py: 8 }} 
              count={
                products.length /9 > Math.floor(products.length /9) 
                  ? Math.floor(products.length /9)+1 
                  : Math.floor(products.length /10)} 
                  showFirstButton showLastButton />
        </Container>
      </main>

    </ThemeProvider>
  );
}