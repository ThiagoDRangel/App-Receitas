import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { saveLocalStorage } from '../helpers/saveLocalStorage';
import blackHeart from '../images/blackHeartIcon.svg';
import logo from '../images/logo.svg';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    name === 'email' ? setEmail(value) : setPassword(value);
  }
  const MIN_PASSWORD = 6;
  const disable = !!(email?.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)
    && password?.length > MIN_PASSWORD);

  const handleButtonClick = () => {
    const userInfo = {
      doneRecipes: [],
      email,
      favoriteRecipes: [],
      inProgressRecipes: { drinks: {}, meals: {} },
    };
    const localStorageKeys = Object.keys(userInfo);
    localStorageKeys.forEach(key => {
      const value = userInfo[key];
      saveLocalStorage(key, value);
    });
    history.push('/meals');
  };
  
  return (
    <main className="login">
      <h1> Em <span>Construção...</span></h1>
      <img 
        alt="imagem de plano de funco"
        className="loginBackground"
        src={ blackHeart }
      />
      <img
        alt="logo do app"
        className="logoImage"
        src={ logo }
      />
      <h1>Login</h1>
      <input
        autoComplete="off"
        className="input-login"
        onChange={ handleChange }
        placeholder="Digite seu e-mail"
        name="email"
        type="text"
        value={ email }
      />
      <input
        autoComplete="off"
        className="input-login"
        onChange={ handleChange }
        placeholder="Digite a sua senha"
        name="password"
        type="password"
        value={ password }
      />
      <button
        className="button"
        disabled={ !disable }
        onClick={ handleButtonClick }
        type="button"
      >
        Login
      </button>
    </main>
  );
}

export default Login;
