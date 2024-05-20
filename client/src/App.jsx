import react, { useEffect, useState } from 'react'
import './index.css'
import Homepage from './pages/Homepage'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import CreateAccount from './pages/CreateAccount'
import ProtectedData from './components/ProtectedData'

import AdminInventory from './pages/AdminInventory'

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
  // {
  //   path:'/dashboard',
  //   element: 
  // },
  {
    path:'/inventory',
    element: <AdminInventory/>, 
  },
 
])


function App() {




  return (
    <RouterProvider router = {router}/>
  )
}

export default App
