import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import addToCart from '../actions/cartActions';

const Cart = () => {
  const { id } = useParams();
  const query = qs.parse(useLocation().search, {
    ignoreQueryPrefix: true,
  });
  const cartData = useSelector(state => state.cartData);
  const { cartItems } = cartData;
  const dispatch = useDispatch();
  console.log(id);
  console.log(query);
  console.log(cartData);
  console.log(cartItems);

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
                      value={item.qty}
                      onChange={e =>
                        dispatch(addToCart(item.product, e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>
                          Qty: {x + 1}
                        </option>
                      ))}
                    </select>
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
