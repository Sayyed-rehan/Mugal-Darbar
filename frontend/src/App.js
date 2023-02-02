import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Bill from './Pages/Bill/Bill'
import BookedOrders from './Pages/Booked Orders/BookedOrders'

import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Myorder from './Pages/My Orders/Myorder'
import Sigin from './Pages/Sigin/Sigin'
import Tables from './Pages/Tables/Tables'

const App = () => {
  return (
    <div>
    
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Home />}/>
          <Route path='/sigin' element={<Sigin />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/booktable' element={<Tables />}/>
          <Route path='/Myorder'element={<Myorder />}/>
          <Route path='/BookedOrders' element={<BookedOrders />}/>
          <Route path='/bill' element={<Bill/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App