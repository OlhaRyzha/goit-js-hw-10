import _debounce from 'lodash.debounce';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { CountriesAPI } from './fetchCountries';

const inputForSearchCountryEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const countriesAPI = new CountriesAPI();

const onInputChange = event => {
  const nameOfCountry = event.target.value.trim();
  if (nameOfCountry.length === 0) {
    countryListEl.innerHTML = '';
    countryInfoEl.innerHTML = '';
    return;
  }



  countriesAPI
    .fetchCountries(nameOfCountry)
    .then(data => {
  
      
      if (data.length > 10) {
        countryListEl.innerHTML = '';
        countryInfoEl.innerHTML = '';
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (data.length > 2 && data.length < 10) {
        createListOfCountries(data);
      }

      if (data.length === 1) {
        countryListEl.innerHTML = '';
        createCountryInfo(data);
      } else {
        countryInfoEl.innerHTML = '';
        
      }
    })
    .catch(err => {
      
      console.log(err);
    });
};

function createListOfCountries(name) {
  countryListEl.innerHTML = name
    .map(el => {
      return `
  <li >
  <a href="#"  style="text-decoration: none; display: flex; align-items: center; gap: 10px; color: #000; font-size: larger;">
    <img src="${el.flags.svg}"  width="40" height="40" alt="${el.name}">
    <p>${el.name.official}</p>
  </a>
</li>
  `;
    })
    .join('');
}

function createCountryInfo(name) {
  countryInfoEl.innerHTML = name
    .map(el => {
      return `
    <li >
    <a href="#"  style="text-decoration: none; display: flex; flex-direction: column; flex-wrap: wrap;  color: #000; font-size: larger;">
    <div style="display: flex; align-items: center; gap: 120px;">
    <img src="${el.flags.svg}"  width="40" height="40" alt="${el.name}">
      <p style="font-family: 'Roboto', sans-serif; font-size: 900; scale: 2;" height="40">${
        el.name.official
      }</p>
      </div>

       <p><span style="font-family: 'Roboto', sans-serif; font-size: 700;">Capital: </span> ${
         el.capital
       }</p>
       <p><span style="font-family: 'Roboto', sans-serif; font-size: 700;">Population:</span> ${
         el.population
       }</p>
       <p><span style="font-family: 'Roboto', sans-serif; font-size: 700;">Languages:</span> ${Object.entries(
         el.languages
       )
         .join('')
         .replace(',', ': ')}</p>
   
    </a>
  </li>
    `;
    })
    .join('');
}

inputForSearchCountryEl.addEventListener(
  'input',
  _debounce(onInputChange, 300)
);
