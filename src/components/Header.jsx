import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import iconeRecipes from '../images/iconeRecipes.svg';
import SearchBar from './SearchBar';

function Header({ title }) {
  const history = useHistory();
  const [searchRender, setSearchRender] = useState(false);
  const { pathname } = history.location;
  const isProfilePath = ['/profile', '/done-recipes', '/favorite-recipes'].includes(pathname);

  function goToProfile() {
    history.push('/profile');
  }

  return (
    <main>
      <section className="header">
        <img
          alt="iconeRecipes"
          className="iconeRecipes"
          src={ iconeRecipes }
        />
        <h1 className="title-food">{title}</h1>
        {isProfilePath ? (
          <input
            alt="profile"
            className="input-profile"
            onClick={goToProfile}
            type="image"
            src={ profileIcon }
          />
        ) : (
          <section className="container-input">
            <input
              alt="profile-top-btn"
              className="input-profile"
              onClick={goToProfile}
              type="image"
              src={profileIcon}
            />
            <input
              alt="search-top-btn"
              className="input-search"
              onClick={() => setSearchRender(!searchRender)}
              type="image"
              src={searchIcon}
            />
          </section>
        )}
      </section>
      {
        searchRender && <SearchBar pageTitle={ title } />
      }
    </main>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
