import React from 'react'
import Navbar from '../components/navBar/Navbar'
import Footer from '../components/footer/Footer'
import homeimage from '../assets/homeimage.png'
import bg_banner from '../assets/bg_banner.jpg'

const Homepage = () => {
  return (
    <div>
        <Navbar/>
        <div className='home-banner'>
            <div className='homeimage-container h-screen relative  w-screen'>
                <img src={bg_banner} alt="bg_img" className='w-full h-full bg-cover bg-center object-cover ' />
                
            </div>
            <div className='home-text-section relative top-1/2 left-1/2 text-center'>
                <h1 className='primary-heading text-7xl pr-5 pl-5 '>
                    Discover the Books
                    You like the most
                </h1>
                <p className='primary-text text-3xl font-semibold uppercase'>
                A trip to the bookshop is the ultimate exercise in empathy. Within it you will find endless opportunities to see and understand the world from someone else’s point of view.
                </p>
                <button className='secondary-button mr-5 ml-5'>
                    Explore More 
                </button>
            </div>
            <div className='home-image-section'>
                <img src={homeimage} alt="" className=''/>
            </div>

        </div>
    <Footer/>

    </div>
  )
}

export default Homepage