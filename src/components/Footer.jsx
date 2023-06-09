import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

function Footer() {
  const history = useHistory();
  return (
    <main>
      <footer className="footer">
        <section className="container-footer">
          <input
            alt="drinks"
            className="drinkIcon"
            onClick={ () => history.push('/drinks') }
            type="image"
            src={ drinkIcon }
          />
          <input
            alt="meals"
            className="mealIcon"
            onClick={ () => history.push('/meals') }
            type="image"
            src={ mealIcon }
          />
        </section>
      </footer>
    </main>
  );
}

export default Footer;