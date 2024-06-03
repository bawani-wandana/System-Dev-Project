import React from 'react';


const OrderSummary = ({ subtotal, includeShipping=false}) => {
    const shippingCost = 250.00;
    const total = includeShipping ? subtotal + shippingCost : subtotal;

  return (
    <div className="bg-c4 rounded-lg shadow-md p-6">
      <h2 className="text-[25px] font-semibold mb-4">Summary</h2>
      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>{subtotal.toFixed(2)}</span>
      </div>
      {includeShipping && (
                <div className="flex justify-between mb-2">
                    <span>Shipping:</span>
                    <span>{shippingCost.toFixed(2)}</span>
                </div>
            )}
            <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>{total.toFixed(2)}</span>
            </div>
    </div>
  );
};

export default OrderSummary;
