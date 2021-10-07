import './sass/main.scss';
import { alert, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import debounce from 'lodash.debounce';

import { refs } from './js/refs';
// import fetchCountries from './js/fetchCountries';

// export default
// function fetchCountries(searchQuery) {
const url = `https://restcountries.com/v2/all?fields=name,capital,population,flag,languages`;

console.log(url);

return fetch(url)
  .then(res => res.json())
  .catch(error => error);
//     .then(response => {
//   console.log(response);
//   if (!response.ok) {
//     throw new Error(response.status);
//   }
//   return response.json();
// });
// }
