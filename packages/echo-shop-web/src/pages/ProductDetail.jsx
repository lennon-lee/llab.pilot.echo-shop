import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailProduct, addProductReview } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import Rating from '../components/Rating';

const ProductDetail = ({ device }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const { id } = useParams();
  const history = useHistory();
  const userData = useSelector(state => state.userData);
  const { userInfo } = userData;
  const productDetail = useSelector(state => state.productDetail);
  const {
    product,
    loading,
    error,
    success: productDetailSuccess,
  } = productDetail;
  const productReviewAdd = useSelector(state => state.productReviewAdd);
  console.log(productReviewAdd);
  const { success: productReviewAddSuccess } = productReviewAdd;
  const dispatch = useDispatch();
  useEffect(() => {
    // todo: addReview
    if (productReviewAddSuccess) {
      console.log(productDetail);
      setRating(3);
      setComment('');
    }
    dispatch(detailProduct(id));
    return () => {
      //
    };
  }, [productReviewAddSuccess]);
  const moveCartPage = () => {
    history.push(`/cart`);
  };
  const handleAddToCart = () => {
    dispatch(addToCart(id, qty, moveCartPage));
  };
  const addRatingHandler = () => {
    dispatch(
      addProductReview(id, {
        name: userInfo.name,
        rating,
        comment,
      }),
    );
  };

  return (
    <section className={`product-detail ${device}`}>
      {loading ? <div>Loading...</div> : <div>{error}</div>}
      {productDetailSuccess && (
        <>
          <div className={`product-detail-main ${device}`}>
            <div className="product-detail-main-cover">
              <img className={device} src={product.image} alt="product" />
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
          <div className="product-detail-space" />
          <div className="product-detail-review">
            <div className="product-detail-review-list">
              <div>Customer Reviews</div>
              {!product.reviews.length && <div>There is no review</div>}
              <div>
                {product.reviews.map(review => (
                  <div
                    key={review._id}
                    className="product-detail-review-list-row"
                  >
                    <div>
                      <div>{product.name}</div>
                      <div>{review.createdAt.substring(0, 20)}</div>
                    </div>
                    <div>
                      <Rating value={review.rating} max={5} />
                      <div>{review.comment}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="product-detail-review-input">
              <div>Leave your review</div>
              <div>
                <select
                  name="rating"
                  id="rating"
                  value={rating}
                  onChange={e => setRating(e.target.value)}
                >
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excelent</option>
                </select>
              </div>
              <div>
                <textarea
                  type="text"
                  name="comment"
                  placeholder="Enter comment"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                />
              </div>
              <div>
                <button type="button" onClick={addRatingHandler}>
                  Submit
                </button>
              </div>
            </div>
          </div>
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
