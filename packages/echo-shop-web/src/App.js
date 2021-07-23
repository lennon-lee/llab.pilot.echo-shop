import { Switch, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './pages/main/Main';
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

        {/* Main */}
        <Route path="/">
          <Main />
        </Route>
      </Switch>
      <Footer device={ device }></Footer>
    </div>
  );
}

export default App;
