import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { currentUser } from '../../utils/currentuser'




const BookedOrders = () => {

    const [orderDetails, setorderDetails] = useState([])
    
   



    const fetchOrderDetail=async()=>{
        const responce = await axios.get(`http://localhost:5000/orderByUserId?userId=${currentUser._id}`)
        setorderDetails(responce.data.data)

    }
          

  

    console.log("orderDetails",orderDetails);
    useEffect(()=>{fetchOrderDetail()},[])
 


  return (
    <div>
   
  
    </div>
  )
}

export default BookedOrders