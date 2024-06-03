import React from 'react';

const Summary = ({ subtotal, shipping }) => {
  const total = subtotal + shipping;

  return (
    <div className="bg-c4 rounded-lg shadow-md p-6 text-[20px]">
      <h2 className="text-[25px] font-semibold mb-4">Summary</h2>
      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Shipping</span>
        <span>${shipping.toFixed(2)}</span>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between mb-2">
        <span className="font-semibold">Total</span>
        <span className="font-semibold">${total.toFixed(2)}</span>
      </div>
      <button className="bg-c3 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
    </div>
  );
};

export default Summary;
