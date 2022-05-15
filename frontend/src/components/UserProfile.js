import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SettingsIcon from '@mui/icons-material/Settings';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Link, useState, useNavigate } from 'react-router-dom';
import { useContext, useReducer, useEffect } from 'react';
import { Store } from '../store';
import { toast, ToastContainer } from 'react-toastify';
import { getError } from '../utils';



const theme = createTheme();
const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_REQUEST':
        return { ...state, loadingUpdate: true };
      case 'UPDATE_SUCCESS':
        return { ...state, loadingUpdate: false };
      case 'UPDATE_FAIL':
        return { ...state, loadingUpdate: false };
  
      default:
        return state;
    }
  };
  
export default function UserProfile() {

  
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
 
  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const info = new FormData(e.currentTarget);
    var email = info.get('email')
    var password = info.get('password')
    var name = info.get('firstName')+" "+info.get("lastName")
    var confirmPassword = info.get('confirmPassword')
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    console.log('print= ', email,'__',  name,'__', password);
    try {
      const { data } = await axios.put(
        '/api/users/profile',
        {
          name,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('User updated successfully');
    } catch (err) {
      dispatch({
        type: 'FETCH_FAIL',
      });
      toast.error(getError(err));
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
      <ToastContainer />
          <Helmet>
            <title>User profile</title>
          </Helmet>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#F8CB2E' }}>
            <SettingsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update profile
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  color = 'warning'
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  autoFocus
                  defaultValue= {userInfo.name.split(' ')[0]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  color = 'warning'
                  required
                  fullWidth
                  id="lastName"
                  name="lastName"
                  autoComplete="family-name"
                  defaultValue= {userInfo.name.split(' ')[1]}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  color = 'warning'
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  defaultValue= {userInfo.email}
                />
              </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    color = 'warning'
                    required
                    fullWidth
                    name="password"
                    label="New password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    color = 'warning'
                    required
                    fullWidth
                    name="confirmPassword"
                    label="confirm new password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                  />
              </Grid>
            
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" 
                  color = 'warning' />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 , bgcolor: "#ee5007d1" , 
                '&:hover': { backgroundColor: '#EE5007' } }}

            >
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}