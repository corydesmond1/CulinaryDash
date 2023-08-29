import React, { useState, useEffect } from 'react';
import './OrderStatus.css';

export default function OrderStatusSection({ onConfirmCheckout }) {
  const [orderStatus, setOrderStatus] = useState('Please confirm order');
  const [timer, setTimer] = useState(null);

  const handleStartTimer = () => {
    setTimer(30); // Start the timer for 30 seconds
    setOrderStatus('Order placed');
  };

  useEffect(() => {
    if (timer !== null && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer === 0 && orderStatus === 'Order placed') {
      setOrderStatus('Order is on its way');
      setTimer(30); // Start the next timer for 30 seconds
    } else if (timer === 0 && orderStatus === 'Order is on its way') {
      setOrderStatus('Order Delivered');
      setTimer(null); // No need for timer after order is delivered
    }
  }, [timer, orderStatus]);

  return (
    <div className="order-status-section">
      <div className="order-tracking-container">
        <div className={`order-tracking ${orderStatus === 'Order placed' ? 'completed' : ''}`}>
          <span className={`is-complete ${orderStatus === 'Order placed' ? 'is-current' : ''}`} />
          <p>Order placed</p>
        </div>
        <div className={`order-tracking ${orderStatus === 'Order is on its way' ? 'completed' : ''}`}>
          <span className={`is-complete ${orderStatus === 'Order is on its way' ? 'is-current' : ''}`} />
          <p>Order is on its way</p>
        </div>
        <div className={`order-tracking ${orderStatus === 'Order Delivered' ? 'completed' : ''}`}>
          <span className={`is-complete ${orderStatus === 'Order Delivered' ? 'is-current' : ''}`} />
          <p>Order Delivered</p>
        </div>
      </div>
      <div className="timer">
        {orderStatus === 'Please confirm order' && (
          <button onClick={handleStartTimer}>Confirm Checkout</button>
        )}
      </div>
    </div>
  );
}
