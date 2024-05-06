import React from 'react'

const sections = [
    {
        title: 'Contact Details',
        items: ['Pavithra Bookshop, Maho.','0772365897']
    },
    {
        title: 'Items',
        items: ['New Arrivals', 'Best Sellers']
    },
    {
        title: 'Information',
        items: ['Shipping & Return Policy', 'Payment Policy', 'Privacy & Cookies Policy', 'Terms & Conditions', 'FAQ']
    },
    {
        title: 'Quick Links',
        items: ['Home', 'Login/Register', 'My Account', 'favourites', 'About Us', 'Contact Us']
    },
]




const Footer = () => {
    return (
        <div className='mb-0 w-full mt-24 bg-purple-950 text-c3 bg-c4 py-y px-2 mr-10'>
            <div className='ml-20 w-max-[3080px] grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-8 font-[lato]'>
                {
                    sections.map((section, index) => (
                        <div key={index}>
                            <h6 className='font-bold uppercase pt-2 text-[16px] '>
                                {section.title}

                            </h6>
                            <ul>
                                {section.items.map((item, i) => (
                                    <li key={i}
                                        className='py-1 text-c2 text-[18px] hover:text-white cursor-pointer'>
                                        {item}
                                    </li>

                                )
                                )}
                            </ul>

                        </div>

                    )
                    )}
                <div className='col-span-2 pt-8 md:pt-2'>
                    <p className='font-bold uppercase'>
                        Subscribe to our newsletter
                    </p>
                    <form action="" className='flex flex-col sm:flex-row mt-5'>
                        <input type='email' placeholder='Enter email address' className='w-[300px] p-2 mr-4 rounded-md mb-4 text-purple-950' />
                        <button className='p-2 mb-4'>
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
            {/*Copyright & Social Icons*/}
            <div className='ml-20 flex flex-col max-w-[1240px] px-2 py-4 justify-between sm:flex-row text-left text-gray-300'>
                <p className='py-2 '>
                    2024 Bawani Wandana. All right reserved.
                </p>
            </div>

        </div>
    )
}

export default Footer