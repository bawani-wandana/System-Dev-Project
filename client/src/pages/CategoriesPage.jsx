import React from 'react'
import Navbar from '../components/navBar/Navbar'
import Footer from '../components/footer/Footer'
import Categories from '../components/Categories'

const CategoriesPage = () => {
  return (
    <div>
        <div>
            <Navbar/>
        </div>
        <div>
            <Categories/>
        </div>
        <Footer/>
    </div>
  )
}

export default CategoriesPage