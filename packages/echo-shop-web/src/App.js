import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

import './sass/main.scss';

function App() {
  const isPC = useMediaQuery({
    query: '(min-width: 1024px)',
  });
  const device = isPC ? 'pc' : 'mobile';

  return (
    <div>
      <Header device={device} />
      <Switch>
        {/* Quick Icon */}
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/register">
          <Register />
        </Route>

        {/* Product */}
        <Route path="/product/productDetail/:id">
          <ProductDetail />
        </Route>

        {/* Cart */}
        <Route path="/cart">
          <Cart />
        </Route>

        {/* Home */}
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer device={device} />
    </div>
  );
}

export default App;
