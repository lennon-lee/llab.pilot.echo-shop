import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './pages/main/Main';
import Login from './pages/login/Login';

function App() {
  return (
    <div>
      <Header></Header>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
      <Footer></Footer>
    </div>
  );
}

export default App;
