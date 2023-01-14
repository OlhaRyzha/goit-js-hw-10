'use strict';
import "notiflix/dist/notiflix-3.2.6.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

export class CountriesAPI {
  static BASE_URL = 'https://restcountries.com';
 
  fetchCountries(name) {
    return fetch(`${CountriesAPI.BASE_URL}/v3.1/name/${name}?fields=name,capital,population,flags,languages`).then(
      response => {
        if(response.status === 404){
          
        countryListEl.innerHTML = '';
        countryInfoEl.innerHTML = '';
          Notify.failure("Oops, there is no country with that name");
          throw new Error();
        
         }
        if (!response.ok) {
          throw new Error(response.status);
        }

        return response.json();
      }
    );
  }
}
