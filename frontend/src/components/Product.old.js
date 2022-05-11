import React from 'react';
import {ImageListItemBar, Fab, Box} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Rating from '@mui/material/Rating' ;
import { Link } from 'react-router-dom';

function Product(props) {
  let {product} = props;

  return (
    <div className='product' key={product.slug}>
      <Link to={`/product/${product.slug}`}>
        <img  
          src={`${product.image}?w=248&fit=crop&auto=format`}
          srcSet={`${product.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={product.name}
          loading="lazy"
        />
      </Link>
      <div className='product-descreption'>
        <Link to={`/product/${product.slug}`}>
          <ImageListItemBar
            title={product.name}
            subtitle={<span>by: {product.brand}</span>}
            position="below"
          />
        </Link>
        <div className='rating'>
          <Rating name="half-rating-read"  value={product.rating} precision={0.5} readOnly />
          <span className='nb-rating'>{product.nbRating}</span>
        </div>
        <strong>$ {product.price}</strong>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab variant="extended">
          <AddShoppingCartIcon sx={{ mr: 1 }} />
            add to cart
        </Fab>
        </Box>
      </div>
  </div>
  );
}

export default Product;