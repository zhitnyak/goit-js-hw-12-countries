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

function onSearch(e) {
  const searchQuery = e.target.value.trim();
  if (searchQuery === '') {
    clearData();
    return;
  }
  fetchCountries(searchQuery).then(updateCountryList);
}

function updateCountryList(data) {
  clearData();

  if (data.length === 1) {
    renderCountryCard(data);
  } else if (data.length > 1 && data.length <= 10) {
    clearData();
    renderCountryName(data);
  } else if (data.length > 10) {
    clearData();
    error({
      title: 'Too many matches found.',
      text: 'Please enter a more specific query!',
      delay: 2000,
    });
  }
}

function renderCountryName(country) {
  refs.countryName.innerHTML = countryNameTpl(country);
}
function renderCountryCard(country) {
  refs.countryCard.innerHTML = countryCardTpl(country);
}

function clearData() {
  refs.countryCard.innerHTML = '';
  refs.countryName.innerHTML = '';
}
