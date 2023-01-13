// import { PromiseProvider } from 'mongoose'
import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { Box, Button, CardActions, Grid, Paper } from '@mui/material';
import "../FoodItemCard/FoodItemCard.css"




const FoodItemCard = (props) => {

  const [qty, setqty] = useState(1)

  const handleAddtoList=()=>{
    
    const listObject={
      title:(props.title),
      price:(props.price),
      qty:qty
    }
    
    const exitingsList = JSON.parse(localStorage.getItem('list')) || []
    exitingsList.push(listObject)
    localStorage.setItem('list', JSON.stringify(exitingsList))
  }


  return (
    <div>
    <div className='food-item-card'>
   

    </div>

    <div className='try'>



    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
      component="img"
        sx={{ height: 220 }}
        image={props.imgUrl}
        title={props.title}
      />
      <CardContent sx={{mb: -1}}>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
         {props.category}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {props.desc}
        </Typography>
 
        <Typography variant="body2">
          {props.price}/-rs          
          
        </Typography>
      </CardContent>



      <CardActions>

       <React.Fragment  >
       <RemoveCircleOutlineRoundedIcon fontSize="small" sx={{ ml:'120px'}} color="error"  onClick={(e)=>setqty(qty-1)}/>
       
        <h4 style={{ padding: "10px"}}>{qty}</h4>
     
        <AddCircleOutlineRoundedIcon fontSize="small" color="success"  onClick={(e)=>setqty(qty+1)}/>
       </React.Fragment>

      </CardActions>


      <CardActions >
      <div className='food-item-card-button'>
        <Button size="small" variant="contained" color="success" onClick={handleAddtoList} >Add to List</Button>
      </div>
      </CardActions>
    </Card>
   

 
    </div>



   
    
    </div>

  )
}

export default FoodItemCard