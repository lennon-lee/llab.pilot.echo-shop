import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {detailProduct} from '../../actions/productActions';

import './ProductDetail.scss';

const ProductDetail = () => {
  const { id } = useParams();
  const productDetail = useSelector((state) => state.productDetail);
  const { product, loading, error } = productDetail;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailProduct(id));

    return () => {      
    }
  }, []);

  return (
    <section>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <section>
          <div>
            <img src={ product.image } />
          </div>
        </section>
      )} 
    </section>
  );
}

export default ProductDetail;