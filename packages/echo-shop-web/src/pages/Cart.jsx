import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import addToCart from '../actions/cartActions';

const Cart = () => {
  const [qtyData, setQtyData] = useState(new Map());
  const { id } = useParams();
  const query = qs.parse(useLocation().search, {
    ignoreQueryPrefix: true,
  });
  const cartData = useSelector(state => state.cartData);
  const { cartItems } = cartData;
  const dispatch = useDispatch();
  const upsertQty = (key, value) => {
    setQtyData(prev => new Map(prev).set(key, value));
  };

  useEffect(() => {
    if (qtyData.size === 0) {
      cartItems.map(item => upsertQty(item.product, item.qty));
    }
  }, [dispatch]);
  console.log(id);
  console.log(query);

  return (
    <section className="cart">
      <div className="cart-shopping">
        <div>
          <h1>Shopping Cart</h1>
        </div>
        {cartItems.length === 0 ? (
          <div>cart is empty</div>
        ) : (
          <div className="cart-shopping-list">
            {cartItems.map(item => (
              <div key={item.product} className="cart-shopping-list-item">
                <div className="cart-shopping-list-item-cover">
                  <img src={item.image} alt="product" width="220px" />
                </div>
                <div className="cart-shopping-list-item-contents">
                  <div className="cart-shopping-list-item-contents-title">
                    {item.name}
                  </div>
                  <div className="cart-shopping-list-item-contents-price">
                    ${item.price}
                  </div>
                  <div>
                    <select
                      value={qtyData.get(item.product)}
                      onChange={e => upsertQty(item.product, e.target.value)}
                    >
                      {[...Array(item.countInStock).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>
                          Qty: {x + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(
                          addToCart(item.product, qtyData.get(item.product)),
                        )
                      }
                    >
                      Update
                    </button>
                    <button type="button">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="cart-buy">Proceed to Checkout</div>
    </section>
  );
};

export default Cart;
