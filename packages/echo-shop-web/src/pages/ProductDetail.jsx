import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailProduct } from '../actions/productActions';

const ProductDetail = () => {
  const { id } = useParams();
  const productDetail = useSelector(state => state.productDetail);
  const { product, loading, error } = productDetail;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailProduct(id));

    return () => {};
  }, [dispatch, id]);

  return (
    <section className="product-detail">
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
            <div className="product-detail-main-buy">Add to Cart</div>
          </div>
          <div className="product-detail-review">Reviews</div>
        </>
      )}
    </section>
  );
};

export default ProductDetail;
