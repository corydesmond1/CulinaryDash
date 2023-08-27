import React, { useEffect, useState, useRef } from "react";
import { yelpBusinessDetail } from "../../utilities/yelp-api";
import * as itemsAPI from '../../utilities/items-api';
import * as ordersAPI from '../../utilities/orders-api'; // Import ordersAPI
import "./RestaurantProfilePage.css";
import { useParams, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import CategoryList from "../../components/CategoryList/CategoryList";
import MenuList from "../../components/MenuList/MenuList";
import OrderDetail from "../../components/OrderDetail/OrderDetail";

export default function RestaurantProfilePage({ user, setUser }) {
  const [menuItems, setMenuItems] = useState([]);
  const [activeCat, setActiveCat] = useState('');
  const [cart, setCart] = useState(null);
  const categoriesRef = useRef([]);
  const navigate = useNavigate();

  const { id } = useParams();
  const [businessDetails, setBusinessDetails] = useState("");

  useEffect(() => {
    if (!id) return;

    // Fetch business details
    yelpBusinessDetail(id)
      .then((res) => setBusinessDetails(res))
      .catch((e) => console.error(e));

    // Fetch menu items
    async function getItems() {
      const items = await itemsAPI.getAll();
      categoriesRef.current = [...new Set(items.map(item => item.category.name))];
      setMenuItems(items);
      setActiveCat(categoriesRef.current[0]);
    }
    getItems();

    // Load cart (a cart is the unpaid order for the logged in user)
    async function getCart() {
      const cart = await ordersAPI.getCart();
      setCart(cart);
    }
    getCart();
  }, [id]);

  /*--- Event Handlers ---*/
  async function handleAddToOrder(itemId) {
    const updatedCart = await ordersAPI.addItemToCart(itemId);
    setCart(updatedCart);
  }

  async function handleChangeQty(itemId, newQty) {
    const updatedCart = await ordersAPI.setItemQtyInCart(itemId, newQty);
    setCart(updatedCart);
  }

  async function handleCheckout() {
    await ordersAPI.checkout();
    navigate('/orders');
  }

  return (
    <main className="RestaurantProfilePage">
      <section className="business-details-section">
        <Logo />
        <div className="business-details">
          <img
            className="profile-image"
            src={businessDetails.image_url}
            alt={businessDetails.name}
          />
          <div className="restaurant-name">{businessDetails.name}</div>
          {/* Business Details */}
          {/* Other Details */}
        </div>
        <CategoryList 
        categories={categoriesRef.current} 
        activeCat={activeCat} 
        setActiveCat={setActiveCat} />
      </section>

      <section className="menu-items-section">
        <MenuList
          menuItems={menuItems.filter(item => item.category.name === activeCat)}
          handleAddToOrder={handleAddToOrder}
        />
      </section>

      <section className="shopping-cart-section">
        <OrderDetail
          order={cart}
          handleChangeQty={handleChangeQty}
          handleCheckout={handleCheckout}
        />
      </section>
    </main>
  );
}
