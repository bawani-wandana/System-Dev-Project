import React from 'react'
import Navbar from '../components/navBar/Navbar'
import Footer from '../components/footer/Footer'
import HomeBanner from '../components/HomeBanner'
import ItemList from '../components/ItemList'




const Homepage = () => {
    return (
        <div className='dark:bg-gray-900'>
            <Navbar />
            <HomeBanner/>
            <ItemList/>
            
            
            
            









            <Footer />
        </div>
    )

}

export default Homepage