import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';

const Cart = ({ device }) => {
  const [qtyData, setQtyData] = useState(new Map());
  const cartData = useSelector(state => state.cartData);
  const { cartItems } = cartData;
  const dispatch = useDispatch();
  const upsertQty = (key, value) => {
    setQtyData(prev => new Map(prev).set(key, value));
  };

  useEffect(() => {
    // cart item 갯수 변경시 qtyData 갯수 일치
    const resultQtyData = new Map();
    qtyData.forEach((value, key) => {
      if (cartItems.find(x => x.product === key)) {
        resultQtyData[key] = value;
      }
    });
    setQtyData(resultQtyData);

    // cart item 정보 갱신
    cartItems.map(item => upsertQty(item.product, item.qty));
    return () => {};
  }, [cartItems]);

  return (
    <section className={`cart ${device}`}>
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
                    <button
                      type="button"
                      onClick={() => dispatch(removeFromCart(item.product))}
                    >
                      Delete
                    </button>
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

Cart.propTypes = {
  device: PropTypes.string,
};

Cart.defaultProps = {
  device: 'pc',
};

export default Cart;
