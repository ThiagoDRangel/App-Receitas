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

  return (
    <main>
      <section className="header">
        <img
          alt="icone recipes"
          className="icone-recipes"
          src={ iconeRecipes }
        />
        <h1 className="title-food">{title}</h1>
        {['/profile', '/done-recipes', '/favorite-recipes'].includes(pathname) ? (
          <input
            alt="profile"
            className="input-profile"
            onClick={() => history.push('/profile')}
            type="image"
            src={ profileIcon }
          />
        ) : (
          <section className="container-inputs">
            <input
              alt="profile-top-btn"
              className="input-profile"
              onClick={() => history.push('./profile')}
              type="image"
              src={ profileIcon }
            />
            <input
              alt="search-top-btn"
              className="input-search"
              onClick={() => setSearchRender(prevState => !prevState)}
              type="image"
              src={ searchIcon }
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

