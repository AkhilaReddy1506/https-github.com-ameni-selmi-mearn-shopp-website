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
import { Helmet } from 'react-helmet-async';
import { Store } from '../../store';



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



export default function UsersList() {

  const [data, setData]= React.useState([])
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/users/all')
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
      const res  = await axios.get(`http://localhost:5000/api/users/delete/${event.target.id}`)
      setData(data.filter((user) => 
        user._id !== event.target.id
      ))
    } catch (err) {
      toast.error(getError(err));
    }  
  };
  
  
  const { state, dispatch: ctxDispatch } = React.useContext(Store);
  const {userInfo} = state ;
  
  return (
    <Container className='main-admin-container'>
      <Helmet>
        <title>user list</title>
      </Helmet>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{backgroundColor:'#006E7F'}}>User email</StyledTableCell>
              <StyledTableCell style={{backgroundColor:'#006E7F'}} align="right">User&nbsp;name</StyledTableCell>
              <StyledTableCell style={{backgroundColor:'#006E7F'}} align="right">User&nbsp;status</StyledTableCell>
              <StyledTableCell style={{backgroundColor:'#006E7F'}} align="center">Delete user</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.filter((row)=> row._id != userInfo._id).map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.email}
                </StyledTableCell>
                <StyledTableCell align="right">{row.name}</StyledTableCell>
                <StyledTableCell align="right">{row.isAdmin ? "admin" : "user"}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button onClick={handleDelete} 
                          id={row._id} variant="outlined" 
                          sx={{color : '#B22727' , border : '1px solid #B22727'}}
                          startIcon={<DeleteIcon />}>
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
