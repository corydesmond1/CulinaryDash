import './MenuListItem.css';

export default function MenuListItem({ menuItem, handleAddToOrder }) {
  return (
    <div className="MenuListItem">
      <div className="name">{menuItem.name}</div>
      <div className="item-description">{menuItem.description}</div>
      <div className="buy">
        <button className="plus-button" onClick={() => handleAddToOrder(menuItem._id)}>
          +
        </button>
        <span className="price">${menuItem.price.toFixed(2)}</span>
      </div>
    </div>
  );
}