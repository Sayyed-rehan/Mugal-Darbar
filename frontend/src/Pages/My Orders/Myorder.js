import React from 'react'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Item, Stack, Typography } from '@mui/material';
import { myFoodItems } from '../../utils/mylist'
import "../My Orders/Myorder.css"
import Navbar from '../../Components/Navbar/Navbar';






const Myorder = () => {

  console.log(myFoodItems);






  return (
    <div>
    <Navbar title="My Orders"/>
   
  


    <div className='my-orders-tbale'>

    <Stack spacing={2}  m='10px'   justifyContent="center"alignItems="center">
    {myFoodItems.map((x)=>(

      <Card sx={{ display: 'flex' , width:'600px' }} >
      <CardMedia  component="img" image={x.img}  sx={{ width: 250 ,height:200 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto'  }}>
        <div className='my-order-text'> 
          <Typography variant="h4" component="div" gutterBottom>{x.title}</Typography>
          <Typography variant="h5">Price: {x.price}/-</Typography>
          <Typography variant="h5">qty - {x.qty}</Typography>
        </div>
          </CardContent>
        </Box>
        <CardActions>
        <div className='my-order-button'>

        <Button size="small" variant='contained' sx={{ml:'auto'}}>Share</Button>
        </div>
      </CardActions>
      </Card>
    ))}
   
    </Stack>
    </div>
    </div>
  )
}

export default Myorder