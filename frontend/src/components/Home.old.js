import React, { useEffect, useReducer } from 'react'
import axios from 'axios'
import Product from './Product.old'
import logger from 'use-reducer-logger'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import  AlertTitle  from '@mui/material/AlertTitle'; 
import {Helmet} from 'react-helmet-async'

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
    <>
    <h1>Featured Products</h1>
    <Helmet>
      <title>Comparison shop</title>
    </Helmet>
      <div className="products-list">
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
      :
        data && (
          data.map(product => (
            <Product
              key={product.slug}
              product={product} />
          ))
        )
      }
      </div>  
  </>
  )
}
