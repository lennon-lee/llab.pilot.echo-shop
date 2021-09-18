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
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';

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
          <Login device={device} />
        </Route>
        <Route path="/profile">
          <Profile device={device} />
        </Route>
        <Route path="/register">
          <Register device={device} />
        </Route>

        {/* Product */}
        <Route path="/product/productDetail/:id">
          <ProductDetail device={device} />
        </Route>

        {/* Cart */}
        <Route path="/cart">
          <Cart device={device} />
        </Route>

        {/* Order */}
        <Route path="/shipping">
          <Shipping device={device} />
        </Route>
        <Route path="/payment">
          <Payment device={device} />
        </Route>
        <Route path="/placeOrder">
          <PlaceOrder device={device} />
        </Route>

        {/* Home */}
        <Route path="/">
          <Home device={device} />
        </Route>
      </Switch>
      <Footer device={device} />
    </div>
  );
}

export default App;
