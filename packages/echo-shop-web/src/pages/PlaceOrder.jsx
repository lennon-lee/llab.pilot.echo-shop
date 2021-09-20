import React from 'react';
import PropsType from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrder = ({ device }) => {
  const history = useHistory();
  const cartData = useSelector(state => state.cartData);
  const { cartItems, shipping, payment } = cartData;

  if (!shipping.address) {
    history.push('/shipping');
  }

  const itemPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemPrice > 100 ? 0 : 10;
  const taxPrice = itemPrice * 0.15;
  const totalPrice = itemPrice + shippingPrice + taxPrice;

  return (
    <section className={`place-order ${device}`}>
      <CheckoutSteps device={device} step1 step2 step3 step4 />
      <div className={`place-order-cart ${device}`}>
        <div className="place-order-cart-info">
          <div className="cart-shipping">
            <div>
              <h1>Shipping</h1>
            </div>
            <div>
              <span>{shipping.address}, </span>
              <span>{shipping.city}, </span>
              <span>{shipping.postalCode}, </span>
              <span>{shipping.country}</span>
            </div>
          </div>
          <div className="cart-payment">
            <div>
              <h1>Payment</h1>
            </div>
            <div>Payment Method: {payment.paymentMethod}</div>
          </div>
          <div className={`cart-shopping ${device}`}>
            <div>
              <h1>Shopping Cart</h1>
            </div>
            {cartItems.length === 0 ? (
              <div>cart is empty</div>
            ) : (
              <div className="cart-shopping-list">
                {cartItems.map(item => (
                  <div
                    key={item.product}
                    className={`cart-shopping-list-item ${device}`}
                  >
                    <div className="cart-shopping-list-item-cover">
                      <Link to={`/product/productDetail/${item.product}`}>
                        <img
                          src={item.image}
                          alt="product"
                          className={device}
                        />
                      </Link>
                    </div>
                    <div className="cart-shopping-list-item-contents">
                      <div className="cart-shopping-list-item-contents-title">
                        <Link to={`/product/productDetail/${item.product}`}>
                          {item.name}
                        </Link>
                      </div>
                      <div className="cart-shopping-list-item-contents-price">
                        ${item.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="place-order-cart-buy">
          <button type="button">Place Order</button>
          <div className="place-order-cart-buy-title">Order Summary</div>
          <div className="place-order-cart-buy-summary">
            <div className="place-order-cart-buy-summary-name">
              <div>Items</div>
              <div>Shipping</div>
              <div>Tax</div>
              <div className="total">Order Total</div>
            </div>
            <div className="place-order-cart-buy-summary-value">
              <div>${itemPrice}</div>
              <div>${shippingPrice}</div>
              <div>${taxPrice}</div>
              <div className="total">${totalPrice}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

PlaceOrder.propTypes = {
  device: PropsType.string,
};

PlaceOrder.defaultProps = {
  device: 'pc',
};

export default PlaceOrder;
