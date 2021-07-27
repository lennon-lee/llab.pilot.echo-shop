import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { update, logout } from '../../actions/userActions';

const Profile = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userData = useSelector((state) => state.userData);
  const { loading, userInfo, error } = userData;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo && userInfo !== 'undefined') {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }

    return () => {
    };
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({userId: userInfo._id, name, email, password}));
  };
  const logoutHandler = () => {
    dispatch(logout());
    history.push('/');
  };

  return (
    <section className="profile">
      <form onSubmit={ submitHandler } className="profile-form">
        <div><h2>User Profile</h2></div>
        <div>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </div>

        <div>
          <label htmlFor="name">Name</label>
          <input value={ name } type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input value={ email } type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <button type="submit" className="button primary">Update</button>
        </div>
        <div>
          New to Echo Shop?
        </div>
        <div>
          <button type="button" onClick={ logoutHandler } className="button gray">Logout</button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
