import React, { useContext } from 'react';
import Navbar from '../components/navBar/Navbar';
import Footer from '../components/footer/Footer';
import { Link } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import { CartContext } from '../contexts/CartContext';
import { FavoritesContext } from '../contexts/FavoritesContext';

const FavoritePage = () => {
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);
  const { addItemToCart } = useContext(CartContext);

  const handleRemoveFromFavorites = (itemID) => {
    removeFromFavorites(itemID);
  };

  const handleAddToCart = (item) => {
    addItemToCart(item);
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Link to='/'>
          <h2 className='flex text-b1 items-start text-[25px] mt-8 pt-4 ml-12'>
            <IoMdArrowBack className='mt-2 w-6 h-6' />Back to HomePage
          </h2>
        </Link>
        <h1 className='pt-8 ml-12 text-c3 text-[30px] font-medium'>Your Favorites</h1>
        <div className='ml-12 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4'>
          {favorites.length === 0 ? (
            <p>No favorite items yet.</p>
          ) : (
            favorites.map((item) => (
              <div key={item.id} className='bg-green-100 text-black w-72 shadow-lg shadow-blue-200 rounded-md overflow-hidden font-[Lato]'>
                <img className='w-full h-[18rem] object-contain mt-3 pl-4 pr-4 pt-3' src={item.image} alt={item.name} />
                <div className='pl-8'>
                  <h2 className='pt-3 text-[23px] overflow-ellipsis whitespace-nowrap overflow-hidden'>{item.name}</h2>
                  <span className='text-[20px] font-bold'>{item.price}</span>
                  <div className={`pt-1 font-bold text-[20px] ${item.stockCount > 0 ? 'text-green-500' : 'text-red-500'}`}>{item.stockCount > 0 ? 'Available' : 'Out of Stock'}</div>
                </div>
                <div className='flex items-center justify-center gap-4 pb-3 pt-2'>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className='bg-gradient-to-r from-orange-300 to-c3 text-white hover:bg-b1 hover:text-white flex rounded-md px-6 py-3 tracking-wider text-[18px] transition'
                  >
                    Add to cart
                  </button>
                  <button
                    onClick={() => handleRemoveFromFavorites(item.id)}
                    className='bg-gradient-to-r from-red-300 to-red-500 text-white hover:bg-red-700 hover:text-white flex rounded-md px-6 py-3 tracking-wider text-[18px] transition'
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default FavoritePage;
