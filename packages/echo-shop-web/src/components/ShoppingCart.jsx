import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';

const ShoppingCart = ({ device, cartItems, readOnly }) => {
  const [qtyData, setQtyData] = useState(new Map());
  const upsertQty = (key, value) => {
    setQtyData(prev => new Map(prev).set(key, value));
  };
  const dispatch = useDispatch();

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
    <div className={`shopping-cart ${device}`}>
      <div>
        <h1>Shopping Cart</h1>
      </div>
      {cartItems.length === 0 ? (
        <div>cart is empty</div>
      ) : (
        <div className="shopping-cart-list">
          {cartItems.map(item => (
            <div
              key={item.product}
              className={`shopping-cart-list-item ${device}`}
            >
              <div className="shopping-cart-list-item-cover">
                <Link to={`/product/productDetail/${item.product}`}>
                  <img src={item.image} alt="product" className={device} />
                </Link>
              </div>
              <div className="shopping-cart-list-item-contents">
                <div className="shopping-cart-list-item-contents-title">
                  <Link to={`/product/productDetail/${item.product}`}>
                    {item.name}
                  </Link>
                </div>
                <div className="shopping-cart-list-item-contents-price">
                  ${item.price}
                </div>

                {/* !readOnly -> show */}
                {!readOnly && (
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
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

ShoppingCart.propTypes = {
  device: PropTypes.string,
  cartItems: PropTypes.arrayOf(PropTypes.any),
  readOnly: PropTypes.bool,
};

ShoppingCart.defaultProps = {
  device: 'pc',
  cartItems: [],
  readOnly: true,
};

export default ShoppingCart;
