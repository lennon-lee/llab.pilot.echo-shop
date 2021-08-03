import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../actions/userActions';

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userData = useSelector((state) => state.userData);
  const { loading, userInfo, error } = userData;
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo && userInfo !== 'undefined') {
      history.goBack();
    }
    return () => {
    };
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  const registerHandler = () => {
    history.push('/register');
  };

  return (
    <section className="login">
      <form onSubmit={submitHandler} className="login-form">
        <div><h2>Login</h2></div>
        <div>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <button type="submit" className="button primary">Login</button>
        </div>
        <div>
          New to Echo Shop?
        </div>
        <div>
          <button type="button" onClick={registerHandler} className="button gray">Create your echo shop account</button>
        </div>
      </form>
    </section>
  );
};

export default Login;
