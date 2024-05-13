import { useState } from 'react'
import './index.css'
import { Button } from '@material-tailwind/react'
import Homepage from './pages/Homepage'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import CreateAccount from './pages/CreateAccount'

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
    path:'loginpage',
    element: <LoginPage/>
  },
  {
    path:'createaccount',
    element: <CreateAccount/>
  },
])
function App() {
  return (
    <RouterProvider router = {router}/>
  )
}

export default App
