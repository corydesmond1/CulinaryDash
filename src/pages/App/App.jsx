import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import RestaurantSearchPage from '../RestaurantSearchPage/RestaurantSearchPage';
import RestaurantProfilePage from '../RestaurantProfilePage/RestaurantProfilePage';
import Navbar from '../../components/NavBar/NavBar';

export default function App() {
  const [user, setUser] = useState(getUser());
  return (
    <>
      <main className="App">
      <Navbar user={user} setUser={setUser} />

        {user ? (
          <Routes>
            <Route path="/restaurants" element={<RestaurantSearchPage />} />
            <Route path="/orders/new" element={<NewOrderPage user={user} setUser={setUser} />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="/*" element={<Navigate to="/orders/new" />} />
            <Route path="/restaurants/:id" element={<RestaurantProfilePage />} />
          </Routes>
        ) : (
          <AuthPage setUser={setUser} />
        )}
      </main>
    </>
  );
}
