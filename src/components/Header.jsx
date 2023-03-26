import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import iconProfile from '../images/profileIcon.svg';
import iconSearch from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/Header.css';
import iconeRecipes from '../images/iconeRecipes.svg';

export default function Header({ title }) {
  const history = useHistory();
  const [searchRender, setSearchRender] = useState(false);
  const { pathname } = history.location;
  const isProfilePage = ['/profile', '/done-recipes', '/favorite-recipes'].includes(pathname);

  return (
    <div>
      <div className="container-header">
        <img
          alt="iconeRecipes"
          className="icone-recipes"
          src={ iconeRecipes }
        />
        <h1 className="title-food">{title}</h1>

        { isProfilePage
          ? (
            <input
              className="input-profile"
              type="image"
              src={ iconProfile }
              data-testid="profile-top-btn"
              onClick={ () => history.push('/profile') }
              alt="profile"
            />)
          : (
            <div
              className="container-inputs"
            >
              <input
                className="input-profile"
                type="image"
                src={ iconProfile }
                data-testid="profile-top-btn"
                onClick={ () => history.push('/profile') }
                alt="profile-top-btn"
              />
              <input
                className="input-search"
                type="image"
                src={ iconSearch }
                data-testid="search-top-btn"
                onClick={ () => (
                  searchRender ? setSearchRender(false) : setSearchRender(true)
                ) }
                alt="search-top-btn"
              />
            </div>)}
      </div>
      {
        searchRender && <SearchBar pageTitle={ title } />
      }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;