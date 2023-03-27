import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getLocalStorage } from '../helpers/saveLocalStorage';
import '../styles/Profile.css';

export default function Profile() {
  const history = useHistory();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const emailLoc = getLocalStorage('user');
    if (emailLoc) {
      setEmail(emailLoc.email);
    }
  }, []);

  const userLogout = () => {
    history.push('/');
    localStorage.clear('user');
  };

  return (
    <div className="profile">
      <Header title="Profile" />
      <p className="profile-user">{email}</p>
      <div className="profile-btn">
        <button
          className="filters"
          type="button"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          className="filters"
          type="button"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          className="filters"
          type="button"
          onClick={ () => userLogout() }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}
