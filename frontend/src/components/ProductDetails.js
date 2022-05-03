import React, { useContext, useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {Helmet} from 'react-helmet-async'
import Grid  from '@mui/material/Grid'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import MemoryIcon from '@mui/icons-material/Memory';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import SaveIcon from '@mui/icons-material/Save';
import StorageIcon from '@mui/icons-material/Storage';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import Rating from '@mui/material/Rating';
import  Card  from '@mui/material/Card';
import  Alert  from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { AlertTitle, FormControl, InputLabel, NativeSelect } from '@mui/material';
import Fab from '@mui/material/Fab'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { getError } from '../utils'
import { Store } from '../store'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false }
    case 'FETCH_FAIL':
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}


export default function ProductDetails() {
  const buildOptions= (max)=> {
    var arr = [];

    for (let i = 1; i <= max; i++) {
        arr.push(<option key={i} value="{i}">{i}</option>)
    }

    return arr; 
}
    const params= useParams()
    const {slug} = params ;
 
    const [{ loading, error, product }, dispatch] = useReducer((reducer), {
      product: [],
      loading: true,
      error: '',
    });
  
    useEffect(() => {
      const fetchData = async () => {
        // console.log('loading', loading);
        dispatch({ type: 'FETCH_REQUEST' })
        try {
          const result = await axios.get(`http://localhost:5000/api/product/slug/${slug}`)
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
          // console.log('data=',data);
        } catch (err) {
          dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
        }
      };
      fetchData()
    }, [slug])
    const {state, dispatch: ctxDispatch} = useContext(Store)
    const {cart} = state ;
    const addToCartHandeller =async()=>{
      const existItem = cart.cartItems.find((x) => x._id === product._id);
      const quantity = existItem ? existItem.quantity + 1 : 1;
      const { data } = await axios.get(`http://localhost:5000/api/products/${product._id}`);
      if (data.countInStock < quantity) {
        window.alert('Sorry. Product is out of stock');
        return;
      }
        ctxDispatch({
          type : "CART_ADD_ITEM" ,
          payload : {...product, quantity}
        })
  }
  
    return (
      loading ? 
      <div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true} 
        >
          <CircularProgress color="inherit" />
        </Backdrop>
    </div>
      : error ? 
        <Alert sx={{ m: 5 }} severity="error">
            <AlertTitle>Error</AlertTitle>
              {error}
        </Alert>
      : product &&(
        <Grid className='Grid' container spacing={2}>
          <Helmet>
            <title>{product.name}</title>
          </Helmet>
          <Grid item xs={4}>
            <img    
              src={`${product.image}?w=248&fit=crop&auto=format`}
              srcSet={`${product.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={product.name}
              loading="lazy"
            />
          </Grid>
          <Grid item xs={4}>
            <h1>{product.name}</h1>
            <span>by: {product.brand}</span>
            <h4>{product.description}</h4>
            <div className='rating'>
              <Rating name="half-rating-read"  value={product.rating} precision={0.5} readOnly />
                <span className='nb-rating'>{product.nbRating}</span>
            </div>
            <hr  style={{backgroundColor: '#000000',}}/>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <SettingsSystemDaydreamIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Operating sustem" secondary={product.os} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <SaveIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="RAM memory" secondary={product.ram} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <StorageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Hard Disk" secondary={product.disk}/>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <MemoryIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="CPU " secondary={product.disk}/>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <FitScreenIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Screen size" secondary={product.screen}/>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={4}>
            <Card className='Card'>
              <List>
                <ListItem>
                <strong style={{fontSize: 25,}}> $ {product.price}</strong>
                </ListItem>
                  {
                    product.countInStock <=0 ? 
                    <ListItem>
                      <Alert severity="error">Unavailable</Alert>
                    </ListItem>
                    : <>
                    <ListItem>
                      <Alert severity="success">In Stock</Alert>
                    </ListItem>
                    <ListItem>
                        <FormControl size="small">
                          <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Qte
                          </InputLabel>
                          <NativeSelect
                            defaultValue={30}
                            inputProps={{
                              name: 'qty',
                              id: 'uncontrolled-native',
                            }}
                          >
                            {buildOptions(product.countInStock)}
                          </NativeSelect>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                    <Fab variant="extended" onClick={addToCartHandeller}>
                      <AddShoppingCartIcon sx={{ mr: 1 }} />
                        add to cart
                    </Fab>
                    </ListItem>
                    </>
                  }
              </List>
              
            </Card>
          </Grid>
        </Grid>
      )
  )
}
