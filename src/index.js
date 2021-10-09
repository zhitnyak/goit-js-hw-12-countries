import './sass/main.scss';
import countryCardTpl from './templates/country-card.hbs';
import countryNameTpl from './templates/country-name.hbs';
import { alert, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import debounce from 'lodash.debounce';

import { refs } from './js/refs';
import fetchCountries from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
  evt.preventDefault();

  const searchQuery = evt.target.value.trim();
  console.log(searchQuery);

  if (searchQuery === '') {
    clearData();
    return;
  }
  fetchCountries(searchQuery)
    .then(data => {
      if (data.length === 1) {
        clearData();
        // success({
        //   title: 'Found country!',
        //   text: 'Check in out!',
        //   delay: 2000,
        // });

        refs.countryCard.innerHTML = countryCardTpl(data);
      }
      return data;
    })
    .then(data => {
      if (data.length > 1 && data.length <= 10) {
        clearData();
        refs.countryName.innerHTML = countryNameTpl(data);
      }
      return data;
    })
    .then(data => {
      if (data.length > 10) {
        clearData();
        error({
          title: 'Too many matches found.',
          text: 'Please enter a more specific query!',
          delay: 2000,
        });
      }
    })
    .catch(error => {
      clearData();
    });
}
function clearData() {
  refs.countryCard.innerHTML = '';
  refs.countryName.innerHTML = '';
}
