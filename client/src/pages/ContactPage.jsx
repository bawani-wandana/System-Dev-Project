import React from 'react'
import Navbar from '../components/navBar/Navbar'
import Footer from '../components/footer/Footer'

const ContactPage = () => {
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
                <h1 className='text-[50px] ml-12 mt-12 text-c3 uppercase'>Pavithra Bookshop</h1>
                <div className='bg-b1 w-[800px] h-[500px] ml-12 mt-4'>
                    <p className='text-white text-[40px] pt-12 pl-12'>Pavithra Bookshop,
                        Main Street,
                        Maho.

                        +94 71 827 9167</p>
                </div>
            </div>
            <div>
                <Footer />
            </div>


        </div>
    )
}

export default ContactPage