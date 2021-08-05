import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';

const Home = () => {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());

    return () => {
    };
  }, [dispatch]);

  return (
    <section className="home">
      {loading ? <div>Loading...</div> : <div>{error}</div>}
      {products && (
        <div className="home-list">
          { products.map((product) => (
            <Product
              key={product._id}
              id={product._id}
              src={product.image}
              name={product.name}
              brand={product.brand}
              price={product.price}
            />
          )) }
        </div>
      )}
    </section>
  );
};

export default Home;
