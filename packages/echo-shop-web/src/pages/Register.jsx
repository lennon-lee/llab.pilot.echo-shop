import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';

const Register = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const userData = useSelector(state => state.userData);
  const { loading, error, userInfo } = userData;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      history.push('/');
    }
    return () => {};
  }, [history, userInfo]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };
  const loginHandler = () => {
    history.push('/login');
  };

  return (
    <section className="register">
      <form onSubmit={submitHandler} className="register-form">
        <div>
          <h2>Register</h2>
        </div>
        <div>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            value={name}
            type="text"
            name="name"
            id="name"
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            type="email"
            name="email"
            id="email"
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            value={password}
            type="password"
            id="password"
            name="password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="re{p}assword">Re-Enter Password</label>
          <input
            value={rePassword}
            type="password"
            id="rePassword"
            name="rePassword"
            onChange={e => setRePassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="button primary">
            Register
          </button>
        </div>
        <div>Already have an account?</div>
        <div>
          <button type="button" onClick={loginHandler} className="button gray">
            Please log in
          </button>
        </div>
      </form>
    </section>
  );
};

export default Register;
