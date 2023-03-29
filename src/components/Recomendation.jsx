import React, { useEffect, useState } from 'react';
import { allDrinksFetch, allMealsFetch } from '../services/fetchAPI';
// import '../styles/Recomendation.css';

function Recomendation({ path }) {
  const [resultData, setResultData] = useState([]);
  const MAX_ITEM = 6;

  useEffect(() => {
    const checkPath = async () => {
    console.log(path);
      if (path === '/meals/:id') {
        setResultData((await allMealsFetch()).meals);
      } else if (path === '/drinks/:id') {
        setResultData((await allDrinksFetch()).drinks);
      }
    };
  
    checkPath().catch((error) => console.error(error));
  }, [path]);
  
  

  return (
    <div className="image-carousel">
      {resultData.slice(0, MAX_ITEM).map((el, index) => (
        <div key={index}>
          <p>
            {
              path === '/meals/:id' ? el.strDrink : el.strMeal
            }
          </p>
          <img
            src={path === '/meals/:id' ? el.strDrinkThumb : el.strMealThumb}
            alt={path === '/meals/:id' ? el.strDrink : el.strMeal}
          />
        </div>
      ))}
    </div>
  );
}

export default Recomendation;
