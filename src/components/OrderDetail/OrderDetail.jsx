import './OrderDetail.css';
import LineItem from '../LineItem/LineItem';

export default function OrderDetail({ order, handleChangeQty, handleCheckout }) {
  if (!order) return null;

  const lineItems = order.lineItems.map(item =>
    <LineItem
      lineItem={item}
      isPaid={order.isPaid}
      handleChangeQty={handleChangeQty}
      key={item._id}
    />
  );

  return (
    <div className="OrderDetail">
      <div className="order-container">
        <div className="line-item-container flex-ctr-ctr flex-col scroll-y">
          {lineItems.length ?
            <>
              {lineItems}
              <section className="total">
                <span className="right">TOTAL&nbsp;&nbsp;</span>
                <span>{order.totalQty}</span>
                <span className="right">${order.orderTotal.toFixed(2)}</span>
              </section>
            </>
            :
            <div className="hungry">Hungry?</div>
          }
        </div>
        <button
          className="checkout-btn"
          onClick={handleCheckout}
          disabled={!lineItems.length}
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
}
