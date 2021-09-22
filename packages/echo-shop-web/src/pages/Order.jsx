import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import BasicOrderCard from '../components/BasicOrderCard';
import ShoppingCart from '../components/ShoppingCart';

const Order = ({ device }) => {
  // TODO: state를 카트에서 detailsOrder 데이터로 변환 필요
  const cartData = useSelector(state => state.cartData);
  const { cartItems, shipping, payment } = cartData;

  const orderCreate = useSelector(state => state.orderCreate);
  const { order, success } = orderCreate;
  console.log(order);

  useEffect(() => {
    console.log(order);
    console.log(success);
  }, success);

  return (
    <section className={`order ${device}`}>
      <div className="order-form">
        <BasicOrderCard title="Shipping" type="shipping" order={shipping} />
        <BasicOrderCard title="payment" type="payment" order={payment} />
        <ShoppingCart device={device} cartItems={cartItems} />
      </div>
      <div className="order-form-buy">
        <button type="button">Paypal</button>
        <div className="order-form-buy-title">Order Summary</div>
        <div className="order-form-buy-summary">
          <div className="order-form-buy-summary-name">
            <div>Items</div>
            <div>Shipping</div>
            <div>Tax</div>
            <div className="total">Order Total</div>
          </div>
          <div className="order-form-buy-summary-value">
            <div>$22</div>
            <div>$33</div>
            <div>$11</div>
            <div className="total">$99</div>
          </div>
        </div>
      </div>
    </section>
  );
};

Order.propTypes = {
  device: PropTypes.string,
};

Order.defaultProps = {
  device: 'pc',
};

export default Order;
