import { Switch, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import ProductDetail from './pages/product/ProductDetail';

import './App.css';
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
