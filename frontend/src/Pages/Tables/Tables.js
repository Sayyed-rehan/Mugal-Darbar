import React, { useEffect, useState } from "react";
import loginUser from "../../utils/loginUser";
import axios from "axios";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Box, Button,  Paper, Stack, Typography } from "@mui/material";
import { currentUser } from "../../utils/currentuser";
import swal from "sweetalert";
import TableRestaurantRoundedIcon from '@mui/icons-material/TableRestaurantRounded';
import ChairRoundedIcon from '@mui/icons-material/ChairRounded';
import Navbar from "../../Components/Navbar/Navbar";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import TimerIcon from '@mui/icons-material/Timer';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const Tables = () => {
  useEffect(() => {
    loginUser();
  }, []);




  const [availabelTables, setavailabelTables] = useState([])
  // const [btnDisabled, setBtnDisabled] = useState(false)

  const fetchAvaliableTables = async () => {
    const responce = await axios.get("http://localhost:5000/availabletable");
    console.log(responce.data.data);
    setavailabelTables(responce.data.data);
  };

  useEffect(() => {
    fetchAvaliableTables();
  }, []);
  console.log(availabelTables);



  const handleBook=async(e)=>{
    const responce = await axios.post("http://localhost:5000/booktable",{
      "tableNumber":(e.target.value), 
      "userId":(currentUser._id)
    })
    console.log(responce.data.message);
    if(responce.data.success){
      await swal({
        title: "Table Booked",
        text: "Table booked successfully, order will be served Shortly",
        icon: "success",
        button: "Go",
      });
      window.location.reload()
    }else{
      await swal({
        title: "Already Booked",
        text: "Table already occupied, Please choose another table",
        icon: "error",
        button: "Ok",
      });
    }
  }

  const  handleUnbook=async(e)=>{
    const responce = await axios.post("http://localhost:5000/unbooktable",{
      "tableNumber":(e.target.value)
    })
    await swal({
      title: "Table Unbooked",
      text: responce.data.message,
      icon: "success",
      button: "Ready to Go",
    });
    window.location.reload()
    console.log(responce.data.data)

  }






  return (
    <div>
      
      <Navbar tableBooking="Table Booking"/>
   

      <div className="tables">
      <Box sx={{ width:'75%', p:'10px' , display:"block", ml:"auto", mr:"auto"}} >
      <Grid container rowSpacing={1}  columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
      {availabelTables.map((x)=>(
        <Grid item xs={6} >
          <Item sx={{height:250}} style={{backgroundColor:x.occupied?'#ff5252':'yellowgreen'}}>
          <Typography variant="h3" sx={{mt:'70px'}} >
          <TableRestaurantRoundedIcon />
          {x.tableNumber}
          <ChairRoundedIcon />
          </Typography>
          </Item>
          <Stack direction={'row'} sx={{p:'10px'}} spacing={2} alignItems='center' justifyContent='center'>

          <Button onClick={handleBook} value={x.tableNumber} variant='contained' color='success' endIcon={<AccessTimeFilledIcon />}>
          Book
          </Button>
          <Button onClick={handleUnbook} value={x.tableNumber} variant='contained' endIcon={<TimerIcon />} color='error'>
          UnBook
          </Button>
          </Stack>
        </Grid>
      ))}
      </Grid>
    </Box>
  
      </div>
    </div>
  );
};

export default Tables;
