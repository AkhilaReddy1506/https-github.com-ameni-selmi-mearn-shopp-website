import React, { useContext, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import UsersList from './UsersList';
import ProductsList from './ProductsList';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import dashboardRoutes from '../../routes';
import { Link, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import { Avatar, Badge, Container, Menu, MenuItem, Stack, Tooltip } from '@mui/material';
import Person from '@mui/icons-material/Person';
import { Store } from '../../store';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

function MenuList() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(1)
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
    
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
    const {cart, userInfo} = state 

    const navigate = useNavigate();   
    const signoutHandler = () => {
      ctxDispatch({ type: 'USER_SIGNOUT' });
      localStorage.removeItem('userInfo');
      navigate('/');
    };
    
    return (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
          <Container maxWidth="xl" className='NavBar'>
            <Toolbar>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    marginRight: 5,
                    ...(open && { display: 'none' }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  CS Admin view
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
              <Stack spacing={2} direction="row" sx={{display: "contents"}} >
                <Link to='/notif'>
                  <IconButton sx={{ marginRight: 2 }} >
                  <Badge badgeContent={5} 
                              color="success" 
                              sx={{ "& .MuiBadge-badge": 
                                                      { fontSize: 12, height: 20, minWidth: 20, backgroundColor: "#F8CB2E" }}}
                    >
                    <NotificationsNoneIcon color="action" />
                  </Badge>
                  </IconButton>
                </Link>
              </Stack>
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
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{'Profile'}</Typography>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{'Dashboard'}</Typography>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center" onClick={signoutHandler}>{'Sign out'}</Typography>
                      </MenuItem>
                  </Menu>
             </Box>
            </Toolbar>
            </Container>
          </AppBar>

          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider  />
            <List>
              {dashboardRoutes.map((route, index) => (
                <Link to={route.path} style={{ textDecoration: 'none' }} key={route.name}>
                <ListItemButton onClick={()=> setSelected(route.id)}
                  sx={{minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, mb :5, }}>
                  <ListItemIcon
                    sx={{minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', }} >
                    {route.icon}
                  </ListItemIcon>
                  <ListItemText primary={route.name} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
                </Link>
              ))}
            </List>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1,  p: 2 }}>
            <DrawerHeader />
          </Box>
        </Box>    
  )
}

export default MenuList