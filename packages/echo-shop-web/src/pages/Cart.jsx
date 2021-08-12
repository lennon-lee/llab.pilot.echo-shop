import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import qs from 'qs';

const Cart = () => {
  const { id } = useParams();
  const query = qs.parse(useLocation().search, {
    ignoreQueryPrefix: true,
  });
  console.log(id);
  console.log(query);

  return (
    <section className="cart">
      <div className="cart-shopping">
        <div>
          <h1>Shopping Cart</h1>
        </div>
        <div className="cart-shopping-list">list</div>
      </div>
      <div className="cart-buy">Proceed to Checkout</div>
    </section>
  );
};

export default Cart;
