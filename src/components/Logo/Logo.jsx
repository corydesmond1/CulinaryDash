import './Logo.css';


export default function Logo() {
  return (
    <div className="Logo">
      <span className="LogoText">Culinary</span>
      <span className="LogoDash">Dash</span>
      <img
        src="https://cdn.iconscout.com/icon/premium/png-512-thumb/delivery-food-4829778-4047150.png?f=avif&w=512"
        alt="Food Logo"
        className="FoodLogo" 
        style={{ width: '100px', height: 'auto' }} // Adjust the width as needed
      />
    </div>
  );
}
