import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import DeleteIcon from '@mui/icons-material/Delete';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container, withStyles } from '@mui/material';
import axios from 'axios'
import { toast } from 'react-toastify';
import { getError } from '../../utils';
import { Helmet } from 'react-helmet-async';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



export default function ProductsList() {

  const [data, setData]= React.useState([])
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products')
        setData(data)
      } catch (err) {
        toast.error(getError(err));
      }  
    }
    fetchData()
  }, [])

  
  const handleDelete = async (event) => {
    // event.preventDefault();
    try {
      const res  = await axios.get(`http://localhost:5000/api/products/delete/${event.target.id}`)
      setData(data.filter((product) => 
        product._id != event.target.id
      ))
    } catch (err) {
      toast.error(getError(err));
    }  
  };
  
  
  return (
    <Container className='main-admin-container'>
      <Helmet>
        <title>product list</title>
      </Helmet>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{backgroundColor:'#006E7F'}}>Product&nbsp;name</StyledTableCell>
              <StyledTableCell align="right" style={{backgroundColor:'#006E7F'}}>Product&nbsp;slug</StyledTableCell>
              <StyledTableCell align="right" style={{backgroundColor:'#006E7F'}}>Product&nbsp;price</StyledTableCell>
              <StyledTableCell align="right" style={{backgroundColor:'#006E7F'}}>Product&nbsp;stock</StyledTableCell>
              <StyledTableCell align="right" style={{backgroundColor:'#006E7F'}}>Product&nbsp;brand</StyledTableCell>
              <StyledTableCell align="right" style={{backgroundColor:'#006E7F'}}>Product&nbsp;link</StyledTableCell>
              <StyledTableCell align="center" style={{backgroundColor:'#006E7F'}}>Delete&nbsp;product</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.slug}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.slug}</StyledTableCell>
                <StyledTableCell align="right">{row.price}</StyledTableCell>
                <StyledTableCell align="right">{row.stock ? row.stock : 'not mention'}</StyledTableCell>
                <StyledTableCell align="right">{row.brand}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button style={{color: "#EE5007"}} size="small" onClick={event =>  window.location.href= row.link }>
                          view
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button onClick={handleDelete} id={row._id} variant="outlined" sx={{color : '#B22727' , border : '1px solid #B22727'}} startIcon={<DeleteIcon />}>
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
