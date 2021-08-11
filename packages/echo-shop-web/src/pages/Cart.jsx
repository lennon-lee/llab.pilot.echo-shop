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
      <div>test</div>
    </section>
  );
};

export default Cart;
