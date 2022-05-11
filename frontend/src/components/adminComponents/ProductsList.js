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
import { Button, Container } from '@mui/material';
import axios from 'axios'
import { toast } from 'react-toastify';
import { getError } from '../../utils';



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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Product&nbsp;name</StyledTableCell>
              <StyledTableCell align="right">Product&nbsp;slug</StyledTableCell>
              <StyledTableCell align="right">Product&nbsp;price</StyledTableCell>
              <StyledTableCell align="right">Product&nbsp;stock</StyledTableCell>
              <StyledTableCell align="right">Product&nbsp;brand</StyledTableCell>
              <StyledTableCell align="center">Delete&nbsp;product</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.slug}</StyledTableCell>
                <StyledTableCell align="right">{row.price}</StyledTableCell>
                <StyledTableCell align="right">{row.stock}</StyledTableCell>
                <StyledTableCell align="right">{row.brand}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button onClick={handleDelete} id={row._id} variant="outlined" startIcon={<DeleteIcon />}>
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
