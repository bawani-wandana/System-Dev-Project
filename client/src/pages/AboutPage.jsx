import React from 'react'
import Navbar from '../components/navBar/Navbar'
import Footer from '../components/footer/Footer'
import bookshop from '../assets/bookshop.jpg'

const AboutPage = () => {
    return (
        <div className='bg-c4'>
            <div>
                <Navbar />
            </div>
            <div className='flex'>
                <div className='shadow-c3 shadow-md border-2 border-c3 ml-12 mt-12 rounded-md'>
                    <img src={bookshop} alt="bookshop"  className='rounded-md'/>
                </div>
                <div className='mt-60 ml-12 mr-12 justify-start items-center '>
                    <h1 className='text-[50px] text-c3 uppercase'>Pavithra Bookshop</h1>
                <p className='text-[20px] '>
                    Welcome to Pavithra Bookshop, your premier destination for literary treasures in Maho! Nestled in the heart of the community, Pavithra Bookshop is a haven for book lovers of all ages. Established with a passion for fostering the love of reading, our shelves are adorned with an extensive collection of diverse books spanning various genres, from bestsellers to classics, fiction to non-fiction, catering to every reader's taste. Our knowledgeable and friendly staff are dedicated to assisting you in finding the perfect read, ensuring an enriching and fulfilling experience with each visit. Beyond being a bookstore, we strive to be a cultural hub, hosting engaging events, book clubs, and activities to cultivate a vibrant literary community. At Pavithra Bookshop, we believe in the power of books to inspire, educate, and ignite imaginations. Join us on a journey through the pages and discover the joy of reading.
                </p>
                </div>
                
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default AboutPage