import './styles.css';
import countryCardTpl from './templates/image-card.hbs'
import countryListTpl from './templates/image-card.hbs'
// import API from './js/apiService';
import getRefs from './js/get-refs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';

const debounce = require('lodash.debounce');
const refs = getRefs();
let searchQuery = '';

const BASE_URL = `https://pixabay.com/api/`;
const MY_KEY = `19199733-53a137615acbd00e25277177c`;
   

function fetchApiPictures(searchQuery) {
    let page = 1;
    const per_page = 5;
    
    return fetch(`${BASE_URL}?image_type=photo
    &orientation=horizontal
    &q=${searchQuery}
    &page=${page}
    &per_page=${per_page}
    &key=${MY_KEY}`)
        .then(r => r.json()); 
}

refs.searchForm.addEventListener('input', debounce(onSearch, 500));
refs.loadMoreBtn.addEventListener('click', onLoadMore)

function onSearch (e) {
    e.preventDefault();

    const input = e.target;
    searchQuery = input.value;
    if (searchQuery.length === 0) {
        clearResult();
        return
    }
    
    console.log(searchQuery);

    // API.fetchApiPictures(searchQuery)
    fetchApiPictures(searchQuery)
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
    // if (country.length > 10) {
    //     clearResult();
    //     console.log(`country.length: ${country.length}`);
    //     return error({
    //         text: `Many countries found, please make your request more specific !!!`,
    //         type: 'info',
    //         delay: 2500           
    //     });
        
    // }
    if (country.length >=2 && country.length <= 10) {
        console.log(`country.length: ${country.length}`);
        return refs.cardContainer.insertAdjacentHTML('beforeend', listMarkUp);
    }    
        refs.cardContainer.insertAdjacentHTML('beforeend', markUp);
}

function onFetchError(error) {
    console.log('Это CATCH!!!');            
    console.dir(error);
    alert('Упс, что-то пошло не так');
}

function clearResult() {   
    refs.cardContainer.innerHTML = "";
}

function onLoadMore() {
    
}


