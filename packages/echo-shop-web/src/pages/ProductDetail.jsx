import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailProduct } from '../actions/productActions';

const ProductDetail = () => {
  const { id } = useParams();
  const productDetail = useSelector((state) => state.productDetail);
  const { product, loading, error } = productDetail;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailProduct(id));

    return () => {
    };
  }, [dispatch, id]);

  return (
    <section className="product-detail">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="product-detail-info">
          <div>
            <img src={product.image} alt="product" />
          </div>
          <div>
            <div>{ product.name }</div>
            <div>{ product.price }</div>
            <div>{ product.description }</div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
