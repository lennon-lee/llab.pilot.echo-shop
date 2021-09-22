import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ShoppingCart from '../components/ShoppingCart';

const Cart = ({ device }) => {
  const cartData = useSelector(state => state.cartData);
  const { cartItems } = cartData;
  const history = useHistory();
  const handlerCheckout = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <section className={`cart ${device}`}>
      <ShoppingCart device={device} cartItems={cartItems} readOnly={false} />
      <div className="cart-buy">
        <button type="button" onClick={handlerCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </section>
  );
};

Cart.propTypes = {
  device: PropTypes.string,
};

Cart.defaultProps = {
  device: 'pc',
};

export default Cart;
