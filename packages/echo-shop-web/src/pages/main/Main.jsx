import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import Product from '../../components/ui/Product';

import './Main.scss';

const Main = () => {
  const category = '';
  const [searchKeyword, setSearchKeyword] = useState('');
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
    }
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, ''));
  }

  return (
    <section className="main-sec">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <section className="main-list">
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
        </section>
      )}
    </section>
  );
};

export default Main;
