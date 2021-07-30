import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Header from './layout/Header.jsx';
import Footer from './layout/Footer.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import Register from './pages/Register.jsx';
import ProductDetail from './pages/ProductDetail.jsx';

// import './App.css';
import './sass/main.scss';

function App() {
  const isPC = useMediaQuery({
    query: "(min-width: 1024px)"
  });
  const device = isPC ? "pc" : "mobile";

  return (
    <div>
      <Header device={ device }></Header>
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

        {/* Home */}
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer device={ device }></Footer>
    </div>
  );
}

export default App;
