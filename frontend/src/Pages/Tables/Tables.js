import React, { useEffect } from 'react'
import loginUser from '../../utils/loginUser'

const Tables = () => {
    useEffect(()=>{
        loginUser()
    },[])


  return (
    <div>
        <h1>Tables</h1>
    </div>
  )
}

export default Tables