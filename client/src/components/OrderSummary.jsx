import React from 'react';
import PropTypes from 'prop-types';

const OrderSummary = ({ cartTotal = 0, includeShipping = false }) => {
    const shippingCost = 250.00;

    // Ensure cartTotal is a valid number
    const formattedCartTotal = typeof cartTotal === 'number' ? cartTotal.toFixed(2) : '0.00';
    const total = includeShipping ? cartTotal + shippingCost : cartTotal;

    return (
        <div className="bg-c4 rounded-lg shadow-md p-6">
            <h2 className="text-[25px] font-semibold mb-4">Summary</h2>
            <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>{formattedCartTotal}</span>
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

OrderSummary.propTypes = {
    cartTotal: PropTypes.number,
    includeShipping: PropTypes.bool,
};

export default OrderSummary;
