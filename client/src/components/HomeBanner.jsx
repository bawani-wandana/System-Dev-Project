import React from 'react'
import banner from '../assets/banner.png'
import Slider from "react-slick";
import mandog from '../assets/mandog.png'
import booktree from '../assets/booktree.png'


const ImageList = [
  {
    id: 1,
    img: banner,
    title: 'Expand your mind, Reading a book.',
    Description: 'Find your new book with the best price',
  },
  {
    id: 2,
    img: mandog,
    title: 'How many a man has dated a new era in his life from the reading of a book',
    Description: '-: Henry David Thoreau',
  },
  {
    id: 3,
    img: booktree,
    title: 'Once you learn to read, you will be forever free.',
    Description: '-: Frederick Douglass',
  },
];


const HomeBanner = () => {
  var settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: 'ease-in-out',
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  return (
    <div className='relative overflow-hidden min-h-[550px]
    sm:min-h-[750px] bg-b2 flex justify-center items-center dark:bg-gray-900 dark:text-white duration-200'>
     <div className='h-[500px] w-[300px] absolute
     right-0  rounded-none '>
     </div>
     <div className='h-[500px] w-[300px]  absolute
      left-10 rounded-none '>
     </div>
      {/* text and other */}
      <div className='container pb-0 sm-pb-0 '>
        <Slider {...settings} className='w-[1550px] right-20 pl-24 h-[750px] bg-blue-50'>
          {ImageList.map((data) => (
            <div key={data.id}>
              <div className='grid grid-cols-1 sm:grid-cols-2'>
                {/* text content section */}
                <div className='flex flex-col justify-center gap-7
                       pt-12 sm:pt-0 text-center text-b1 sm:text-left order-2 sm:order-1 relative z-10'>
                  <h1 className='text-[30px] uppercase sm:text-6xl lg:text-5xl font-bold '
                  >{data.title} </h1>
                  <p className='text-[25px] uppercase text-c3'>{data.Description}</p>
                  <div>
                    <button className='bg-gradient-to-r from-blue-600 to-b1 w-[200px]
                             h-16 hover:scale-105 duration-200 text-[24px] text-white py-2 px-4 rounded-md'>
                      Explore More
                    </button>
                  </div>
                </div>
                {/* image section */}
                <div className='order-1 sm:order-2'>
                  <div className='relative z-10  my-36'>
                    <img src={data.img} alt={data.title}
                      className='w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-125 lg:scale-120 object-contain
                       mx-auto'/>
                  </div>
                </div>
              </div>
            </div>

          ))}
        </Slider>

      </div>

    </div>
  )
}

export default HomeBanner
