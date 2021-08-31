import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailProduct } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';

const ProductDetail = ({ device }) => {
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const history = useHistory();
  const productDetail = useSelector(state => state.productDetail);
  const { product, loading, error } = productDetail;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailProduct(id));

    return () => {};
  }, [dispatch, id]);
  const moveCartPage = () => {
    history.push(`/cart`);
  };
  const handleAddToCart = () => {
    dispatch(addToCart(id, qty, moveCartPage));
  };

  return (
    <section className={`product-detail ${device}`}>
      {loading ? <div>Loading...</div> : <div>{error}</div>}
      {product && (
        <>
          <div className="product-detail-main">
            <div className="product-detail-main-cover">
              <img src={product.image} alt="product" />
            </div>
            <div className="product-detail-main-info">
              <div className="product-detail-main-info-name">
                {product.name}
              </div>
              <div className="product-detail-main-info-price">
                <span className="label">Price: </span>
                <span className="label-value">${product.price}</span>
              </div>
              <div className="product-detail-main-info-description">
                {product.description}
              </div>
            </div>
            <div className="product-detail-main-buy">
              <div className="product-detail-main-buy-price">
                <div className="label-value">${product.price}</div>
              </div>
              <div className="product-detail-main-buy-stock">
                {product.countInStock > 0 ? 'In Stock' : 'Unavailable.'}
              </div>
              <div>
                <select
                  value={qty}
                  onChange={e => {
                    setQty(e.target.value);
                  }}
                >
                  {[...Array(product.countInStock).keys()].map(x => (
                    <option key={x + 1} value={x + 1}>
                      Qty: {x + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="product-detail-main-buy-cart">
                {product.countInStock > 0 && (
                  <button type="button" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="product-detail-review">Reviews</div>
        </>
      )}
    </section>
  );
};

ProductDetail.propTypes = {
  device: PropTypes.string,
};

ProductDetail.defaultProps = {
  device: 'pc',
};

export default ProductDetail;
