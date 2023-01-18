import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React, { useEffect } from 'react'
// import "../Navbar/Navbar.css"
import {currentUser} from "../../utils/currentuser"
import LocalDiningTwoToneIcon from '@mui/icons-material/LocalDiningTwoTone';


const Navbar = () => {

    let a = JSON.parse(localStorage.getItem('list'))



    const handleButton =()=>{
      window.location.href="/Myorder"
    }

    
  return (
    <div >
        <div className='navbar-appbar' >
        <AppBar position="static" sx={{mb:'10px', bgcolor:"#ec407a"}}    >
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit"  sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mugal-Dabrbar
          </Typography>

          <Typography sx={{m:'10px'}}>🥪 feeling hungry - {currentUser.name.split(" ")[ 1]}😋</Typography>

          <Button color="inherit" variant='outlined' onClick={handleButton} startIcon={<LocalDiningTwoToneIcon  fontSize='large' color='inherit'/>}>{a.length}</Button>

        </Toolbar>
      </AppBar>
        </div>
    </div>
  )
}

export default Navbar