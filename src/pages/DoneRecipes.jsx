import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import CardDoneRecipes from '../components/CardDoneRecipes';
import { getLocalStorage } from '../helpers/saveLocalStorage';
// import '../s

function DoneRecipes() {
  
  
  return (
    <main>
      <CardDoneRecipes done={undefined} />
    </main>
  );
}

export default DoneRecipes;
