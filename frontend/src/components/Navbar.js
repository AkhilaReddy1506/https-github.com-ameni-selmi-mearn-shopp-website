import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import LoginIcon from '@mui/icons-material/Login';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge  from '@mui/material/Badge';
import { Stack } from '@mui/material';
import { Store } from '../store';



const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(0);
  const [anchorElUser, setAnchorElUser] = useState(0);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {cart, userInfo} = state ;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    window.location.href = '/';
  };
  
  return (
    <AppBar position="static" >
      <Container maxWidth="xl" className='NavBar'>
        <Toolbar disableGutters>
        <Link to="/" className='Nav_link'>  
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Comparison shop 
          </Typography>
        </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Link to="/products" className='Nav_link' >
                <MenuItem className='Nav_link' onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Products</Typography>
                </MenuItem>
              </Link>
              <Link to="/featured" className='Nav_link'>
                <MenuItem className='Nav_link' onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Featured</Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>
          <Link to="/" className='Nav_link'>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              Comparison shopping
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link to="products" className='Nav_link'>
              <Button 
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  > Products
              </Button>
            </Link>
            <Link to="featured" className='Nav_link'>
              <Button 
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              > Featured
              </Button>
            </Link>
           </Box>

          <Box sx={{ flexGrow: 0 }}>
            
            <Stack spacing={2} direction="row" sx={{display: "contents"}} >
              <Link to='/cart'>
                <IconButton sx={{ marginRight: 2 }} >
                <Badge badgeContent={
                            cart.cartItems.reduce((a, c) => a + c.quantity, 0)} 
                            color="success" 
                            sx={{ "& .MuiBadge-badge": 
                                                    { fontSize: 12, height: 20, minWidth: 20, backgroundColor: "#F8CB2E" }}}
                  >
                  <ShoppingCartIcon color="action" />
                </Badge>
                </IconButton>
              </Link>
            </Stack>
            {
              userInfo 
              ?(
                <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={userInfo.name} src="" />
                  </IconButton>
                </Tooltip>
                <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                    <MenuItem onClick={handleCloseUserMenu}>Signed in as&nbsp;
                      <Typography style={{ fontWeight: 600 }} textAlign="center">{userInfo.name}</Typography>
                    </MenuItem> 
                    <hr style={{backgroundColor: 'black',height: 0.5 }}/>
                    <Link to="/userupdate">
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{'Profile'}</Typography>
                      </MenuItem>
                    </Link>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{'Dashboard'}</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center" onClick={signoutHandler}>{'Sign out'}</Typography>
                    </MenuItem>
                </Menu>
                </>
              )
              :(
                <Link style={{ textDecoration: 'none' }} to="/signin">
                  <Button variant="contained" style={{backgroundColor: "#006E7F"}} endIcon={<LoginIcon/>}>
                    Sign in
                  </Button>
                </Link>
              )
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
