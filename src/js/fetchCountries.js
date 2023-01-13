'use strict';
import "notiflix/dist/notiflix-3.2.6.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
export class CountriesAPI {
  static BASE_URL = 'https://restcountries.com';
 
  fetchCountries(name) {
    return fetch(`${CountriesAPI.BASE_URL}/v3.1/name/${name}?fields=name,capital,population,flags,languages`).then(
      response => {
        if(response.status === 404){
          Notify.failure("Oops, there is no country with that name");
         }
        if (!response.ok) {
          throw new Error(response.status);
        }

        return response.json();
      }
    );
  }
}
