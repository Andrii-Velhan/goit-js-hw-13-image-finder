import './styles.css';
import countryCardTpl from './templates/country-card.hbs'
import countryListTpl from './templates/list-card.hbs'
import API from './js/fetchCountries';
import getRefs from './js/get-refs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';

const debounce = require('lodash.debounce');
const refs = getRefs();

refs.searchInput.addEventListener('input', debounce(onSearch, 500))

function onSearch (e) {
    e.preventDefault();

    const input = e.target;
    const searchQuery = input.value;
    if (searchQuery.length === 0) {
        clearResult();
        return
    }
    
    console.log(searchQuery);

    API.fetchCountries(searchQuery)
        .then(renderCountryCard)
        .catch(onFetchError)        
}

function renderCountryCard(country) {
    const markUp = countryCardTpl(country);        
    const listMarkUp = countryListTpl(country);

    if (country.status === 404) {
        clearResult();
        return error({
            text: 'The country for your request was not found. Please try again',
            type: 'info',
            delay: 2500           
        });        
    }
    if (country.length > 10) {
        clearResult();
        console.log(`country.length: ${country.length}`);
        return error({
            text: `Many countries found, please make your request more specific !!!`,
            type: 'info',
            delay: 2500           
        });
        
    }
    if (country.length >=2 && country.length <= 10) {
        console.log(`country.length: ${country.length}`);
        return refs.cardContainer.innerHTML = listMarkUp;
    }    
        refs.cardContainer.innerHTML = markUp;
}

function onFetchError(error) {
    console.log('Это CATCH!!!');            
    console.dir(error);
    alert('Упс, что-то пошло не так');
}

function clearResult() {   
    refs.cardContainer.innerHTML = "";
}



