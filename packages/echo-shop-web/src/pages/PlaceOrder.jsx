import React, { useEffect } from 'react';
import PropType from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import createOrder from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import BasicOrderCard from '../components/BasicOrderCard';
import ShoppingCart from '../components/ShoppingCart';

const PlaceOrder = ({ device }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const cartData = useSelector(state => state.cartData);
  const orderCreate = useSelector(state => state.orderCreate);
  const { order, success } = orderCreate;
  const { cartItems, shipping, payment } = cartData;

  if (!shipping.address) {
    history.push('/shipping');
  }

  const itemPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemPrice > 100 ? 0 : 10;
  const taxPrice = itemPrice * 0.15;
  const totalPrice = itemPrice + shippingPrice + taxPrice;

  const handlerPlaceOrder = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shipping,
        payment,
        itemPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }),
    );
  };

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [success]);

  return (
    <section className={`place-order ${device}`}>
      <CheckoutSteps device={device} step1 step2 step3 step4 />
      <div className={`place-order-form ${device}`}>
        <div className="place-order-form-info">
          <BasicOrderCard title="Shipping" type="shipping" order={shipping} />
          <BasicOrderCard title="Payment" type="payment" order={payment} />
          <ShoppingCart device={device} cartItems={cartItems} />
        </div>
        <div className="place-order-form-buy">
          <button type="button" onClick={handlerPlaceOrder}>
            Place Order
          </button>
          <div className="place-order-form-buy-title">Order Summary</div>
          <div className="place-order-form-buy-summary">
            <div className="place-order-form-buy-summary-name">
              <div>Items</div>
              <div>Shipping</div>
              <div>Tax</div>
              <div className="total">Order Total</div>
            </div>
            <div className="place-order-form-buy-summary-value">
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
