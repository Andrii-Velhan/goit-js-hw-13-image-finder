import './styles.css';
import countryCardTpl from './templates/image-card.hbs'
import countryListTpl from './templates/image-card.hbs'
import ImageApiService from './js/apiService';
import getRefs from './js/get-refs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';

const debounce = require('lodash.debounce');
const refs = getRefs();

refs.searchForm.addEventListener('input', debounce(onSearch, 500));
refs.loadMoreBtn.addEventListener('click', onLoadMore)
const imageApiService = new ImageApiService();

function onSearch (e) {
    e.preventDefault();

    //imageApiService.query = e.currentTarget.elements.query.value;
    imageApiService.query = e.target.value;
    imageApiService.resetPage();
    imageApiService.fetchArticles().then(articles => console.log(articles));
   
    if (imageApiService.query.length === 0) {
        clearResult();
        return
    }
    
    console.log(imageApiService.query);

    imageApiService.fetchArticles()
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
  imageApiService.fetchArticles().then(articles => console.log(articles));   
}


