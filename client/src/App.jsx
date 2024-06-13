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
import UserHandling from './pages/Admin/UserHandling'
import CartPage from './pages/Customer/CartCheckoutPage'
import CheckOut from './pages/Customer/CheckOut'
import PaymentPage from './pages/Customer/PaymentPage'
import OrderComplete from './pages/Customer/OrderComplete'
import ItemsDisplayPage from './pages/Customer/ItemsDisplayPage'
import { CartProvider } from './contexts/CartContext'
import ProtectedRoute from './components/ProtectedRoute'
import StaffOrderStatus from './pages/Staff/StaffOrderStatus'
import ProfilePage from './pages/ProfilePage'
import CustomerOrder from './pages/Customer/CustomerOrder'
import CategoriesPage from './pages/CategoriesPage'

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
    element: <ProtectedData />,
  },
  {
    path:'/dashboard',
    element:<ProtectedRoute component={Admindashboard} allowedRoles={['Admin']} />
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
  {
    path:'/userhandling',
    element: <UserHandling/>,
  },
  {
    path:'/cartpage',
    element: <CartPage/>,
  },
  {
    path:'/checkout',
    element: <CheckOut/>,
  },
  {
    path:'/paymentpage',
    element: <PaymentPage/>,
  },
  {
    path:'/ordercomplete',
    element: <OrderComplete/>,
  },
  {
    path:'/itemsdisplay/:itemID',
    element: <ItemsDisplayPage/>,
  },
  {
    path:'/stafforderstatus',
    element: <StaffOrderStatus/>,
  },
  {
    path:'/profilepage/:id',
    element: <ProfilePage/>,
  },
  {
    path:'/customerorders',
    element:<ProtectedRoute component={CustomerOrder} allowedRoles={['Customer']} />
  },
  {
    path:'/categories/:category',
    element: <CategoriesPage/>,
  },
  
 
])


function App() {




  return (
    <CartProvider>
    <RouterProvider router={router} />
  </CartProvider>
  )
}

export default App
