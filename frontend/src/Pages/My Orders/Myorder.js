import React from 'react'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Item, Stack, Typography } from '@mui/material';
import { myFoodItems } from '../../utils/mylist'
import "./Myorder.css"
import Navbar from '../../Components/Navbar/Navbar';







const Myorder = () => {

  console.log(myFoodItems);






  return (
    <div>
    <Navbar title="My Orders"/>
   
  


    <div className='my-orders-table'>

    <Stack spacing={2}  m='20px'   justifyContent="center"  alignItems="center">
    {myFoodItems.map((x)=>(

      <Card sx={{ display: 'flex' , width:'600px', boxShadow:12  }} >

      <CardMedia  component="img" image={x.img}  sx={{ width: 250 ,height:200}} />
        {/* <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto'  }}>
        <div className='my-order-text'> 
          <Typography variant="h4" component="div" gutterBottom align="right">{x.title}</Typography>
          <Typography variant="h5">Price: {x.price}/-</Typography>
          <Typography variant="h5">qty - {x.qty}</Typography>
        </div>
          </CardContent>
        </Box> */}

        <Box>
          <CardContent>
            <Typography variant='h4' gutterBottom >{x.title}</Typography>
            <Typography variant='h6' gutterBottom>Price : {x.price}/-</Typography>
            <Typography variant='h6' gutterBottom>Qty : {x.qty}🍴</Typography>
          </CardContent>
        </Box>

        <CardActions >
        <Button variant='contained' size='samll' sx={{bgcolor:'#1e88e5'}}>Remove</Button>
      </CardActions>
      
      </Card>
    ))}
   
    </Stack>
    </div>
    </div>
  )
}

export default Myorder