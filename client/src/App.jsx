import react, { useEffect, useState } from 'react'
import './index.css'
import Homepage from './pages/Homepage'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import CreateAccount from './pages/CreateAccount'
import ProtectedData from './components/ProtectedData'
import AdminInventory from './pages/Admin/AdminInventory'
import Admindashboard from './pages/Admin/Admindashboard'
import AddItems from './pages/Admin/AddItems'
import OrderStatus from './pages/Admin/OrderStatus'
import StaffHandling from './pages/Admin/StaffHandling'
import StaffDashboard from './pages/Staff/StaffDashboard'

const router = createBrowserRouter([
  {
    path:'/',
    element: <Homepage/>
  },
  {
    path: '*',
    element:<h1>Error 404: PAGE NOT AVAILABLE</h1>
  },
  {
    path:'/loginpage',
    element: <LoginPage/>
  },
  {
    path:'/createaccount',
    element: <CreateAccount/>
  },
  {
    path: '/protected',
    element: <ProtectedData />
  },
  {
    path:'/dashboard',
    element: <Admindashboard/> 
  },
  {
    path:'/inventory',
    element: <AdminInventory/>, 
  },
  {
    path:'/additems',
    element: <AddItems/>, 
  },
  {
    path:'/orderstatus',
    element: <OrderStatus/>, 
  },
  {
    path:'/staffhandling',
    element: <StaffHandling/>, 
  },
  {
    path:'/staffdashboard',
    element: <StaffDashboard/>, 
  },
 
])


function App() {




  return (
    <RouterProvider router = {router}/>
  )
}

export default App
