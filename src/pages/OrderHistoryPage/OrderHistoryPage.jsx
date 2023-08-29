import React from 'react';
import OrderStatusSection from '../../components/OrderStatus/OrderStatus';

export default function OrderHistoryPage() {
  const handleConfirmCheckout = () => {
    // You can perform any necessary actions here
  };

  return (
    <div className="OrderHistoryPage">
      <h1>Order Status</h1>
      <div className="left-section">
        <OrderStatusSection onConfirmCheckout={handleConfirmCheckout} />
      </div>

      {/* Render the "Order Status" section on the right */}
      <div className="right-section">
        {/* Render the "Order Status" content here */}
      </div>
    </div>
  );
}
