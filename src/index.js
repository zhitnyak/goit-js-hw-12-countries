import './sass/main.scss';
import countryCardTpl from './templates/country-card.hbs';
import countryNameTpl from './templates/country-card.hbs';
import { alert, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import debounce from 'lodash.debounce';

import { refs } from './js/refs';
// import fetchCountries from './js/fetchCountries';

// export default
function fetchCountries(searchQuery) {
  const url = `https://restcountries.com/v2/${searchQuery}?fields=name,capital,population,flag,languages`;

  // console.log(url);

  return fetch(url)
    .then(res => res.json())
    .catch(error => error);
  // .then(res => {
  //     if (res.ok) return res.json();
  //         throw new Error('Error fetching data')
  // })
  // .catch(error => {
  //     console.error('Error: ', error)
  // });
}
const DEBOUNCE_DELAY = 300;
refs.input.addEventListener('input', debounce(onPressInput, DEBOUNCE_DELAY));
// console.log(input);
function onPressInput(e) {
  e.preventDefault();
  const searchQuery = e.target.value.trim();
  console.log(searchQuery);
  // if (searchQuery === '') {
  //   clearData();
  //   return;
  // }
  // fetchCountries(searchQuery)
  //   .then(data => {
  //     return data;
  //   })
  //   .then();
}

function clearData() {
  countryCard.innerHTML = '';
  countryName.innerHTML = '';
}
