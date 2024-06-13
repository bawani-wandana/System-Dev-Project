import React, { useEffect } from 'react'
import Navbar from '../components/navBar/Navbar'
import Footer from '../components/footer/Footer'
import HomeBanner from '../components/HomeBanner'
import { IoIosArrowForward } from "react-icons/io";
import ItemList from '../components/ItemList';



const Homepage = () => {
    return (
        <div className='dark:bg-gray-900 bg-gray-200'>
            <Navbar />
            <HomeBanner />
            <div className='ml-3 mt-3 '>
                <div className='flex text-[25px] ml-5 mt-12 text-b1'>
                <IoIosArrowForward className='mt-2 ml-5' />
                    All Books
                </div>
                <div className='pt-5 ml-12'>
                    <ItemList/>
                </div>


            </div>

















            <Footer />
        </div>
    )

}

export default Homepage