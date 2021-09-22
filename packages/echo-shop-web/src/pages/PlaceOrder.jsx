import React from 'react';
import PropType from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import BasicOrderCard from '../components/BasicOrderCard';
import ShoppingCart from '../components/ShoppingCart';

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
          <BasicOrderCard title="Shipping" type="shipping" order={shipping} />
          <BasicOrderCard title="Payment" type="payment" order={payment} />
          <ShoppingCart device={device} cartItems={cartItems} />
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
  device: PropType.string,
};

PlaceOrder.defaultProps = {
  device: 'pc',
};

export default PlaceOrder;
