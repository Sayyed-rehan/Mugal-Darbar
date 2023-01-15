import React, { useEffect, useState } from 'react'
import { currentUser } from '../../Components/utils/currentuser'
import "../Home/Home.css"
import axios from 'axios'
import FoodItemCard from '../../Components/FoodItemCard/FoodItemCard'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';









const Home = () => {

  const [searchTextItems, setsearchTextItems] = useState('')
  const [allFoodItems, setallFoodItems] = useState([])


  const handleLogout=()=>{
    localStorage.removeItem('currentUser')
    window.location.href="/login"
  }

  useEffect(()=>{
    if(!currentUser){
      window.location.href="/login"
    }
  },[])



  const fetchAllFoodItems = async()=>{
    const responce = await axios.get("http://localhost:5000/allFoodItems")
    console.log('all items',responce.data.data);
    setallFoodItems(responce.data.data)
  }

  const fetchSpecificFoodItems = async()=>{
    const responce = await axios.get(`http://localhost:5000/getfoodbytitle?title=${searchTextItems}`)
    console.log('spefific items',responce.data.data);
    setallFoodItems(responce.data.data)

  }

  useEffect(()=>{
    if(searchTextItems.length > 0){
      fetchSpecificFoodItems()
    }else{
      fetchAllFoodItems()
    }
  },[searchTextItems])

  




  return (
    <div>
      <h2 align="center" style={{ padding: "10px"}}>Mugal-Darbar</h2>
      

      <div className='home-search-bar'>

      <TextField id="outlined-basic" label="Search your favorite Dishes here" variant="outlined" onChange={(e) => setsearchTextItems(e.target.value)}
      size='large' name='items' value={searchTextItems} fullWidth='true' />
      </div>
      <br />

      <div className='all-food-items'>

      {allFoodItems?.map((x,i) =>{
        return(

            <FoodItemCard  
            category={x.category}
            desc = {x.desc}
            imgUrl={x.imgUrl}
            price={x.price}
            title={x.title}
            key={i}/>
        
        )
      })}
          
      </div>
      <div className='home-logout-button'>

    <Button variant='contained' color='error' onClick={handleLogout} sx={{ml:'45%'}}>Logout <LogoutIcon /></Button>
      </div>

    </div>
    

    
  )
}

export default Home