import * as React from 'react';
import { useEffect, useReducer, useState, useContext } from 'react'
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
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
import { ImageListItemBar, Rating } from '@mui/material';
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

export default function Home() {
 
    const [{ loading, error, data }, dispatch] = useReducer(logger(reducer), {
        data: [],
        loading: true,
        error: '',
      })
      
      useEffect(() => {
        const fetchData = async () => {
          // console.log('loading', loading);
          dispatch({ type: 'FETCH_REQUEST' })
          try {
            const result = await axios.get('http://localhost:5000/api/products')
            dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
            console.log('data=',result.data)
          } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: err.message })
          }
        }
        fetchData()
      }, [])
    
      

    return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Helmet>
        <title>Comparison shop</title>
      </Helmet>
      <main>
        {/* Hero unit */}
        <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 16, }} >
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
              Comparison shop
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Save money with us, we extract content and data from different websites.
              Everything you need in one place, buy at the right time.
            </Typography>
            <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center" >
              <Link to="/products">
                <Button style={{backgroundColor: "#F8CB2E"}} variant="contained">All products</Button>
              </Link>
              <Link to="/signup">
                <Button style={{color: "#006E7F", border: "1px solid #006E7F"}} variant="outlined">Sign up</Button>
              </Link>
            </Stack>
          </Container>
        </Box>

        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
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
        :data.slice(0, 9).map((card) => (
                <Grid item key={card.slug} xs={12} sm={6} md={4} >
                <Card className="Card"
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                    component="img"
                    sx={{
                        // 16:9
                        pt: '15%',
                    }}
                    image={`${card.image}?w=248&fit=crop&auto=format`}
                    alt="random"
                    />
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
        </Container>
      </main>

    </ThemeProvider>
  );
}