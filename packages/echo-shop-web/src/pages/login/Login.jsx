import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../actions/userActions';

import './Login.scss';

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo && userInfo !== 'undefined') {
      history.push('/');
    }
    return () => {
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <section className="form">
      <form onSubmit={ submitHandler } className="form-container" >
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
          <Link to="register" className="button gray">Create your echo shop account</Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
