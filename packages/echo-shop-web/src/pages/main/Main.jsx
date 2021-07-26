import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import Product from './components/Product';

import './Main.scss';

const Main = () => {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());

    return () => {
    }
  }, [dispatch]);
  
  return (
    <section className="contents">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="product-list">
          { products.map(product => (          
            <Product
              key={ product._id }
              id={ product._id }
              src={ product.image }
              name={ product.name }
              brand={ product.brand }
              price={ product.price }
            />
          )) }
        </div>
      )}
    </section>
  );
};

export default Main;
