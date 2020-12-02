import articlesCardTpl from '../templates/image-card.hbs';
import ImageApiService from './apiService';
import getRefs from './get-refs';
import { error } from '@pnotify/core';

const imageApiService = new ImageApiService();

function onSearch(e) {
    e.preventDefault();

    clearResult();
    imageApiService.query = e.target.value;
    imageApiService.resetPage();
    
    if (imageApiService.query.length === 0) {
        clearResult();
        return
    }

    if (imageApiService.query === ' ') {        
               return error({
            text: 'Input something real ! ! !',
            type: 'info',
            delay: 2500           
        }); 
    }

     if (imageApiService.query.status === 404) {
        clearResult();
        console.log('not find');
        return error({
            text: 'The articles for your request was not found. Please try again',
            type: 'info',
            delay: 2500           
        });        
    } 
    
    imageApiService.fetchArticles().then(renderArticlesCard)
        .catch(onFetchError);
}

export function renderArticlesCard(hits) {
    const markUp = articlesCardTpl(hits);  

    refs.cardContainer.insertAdjacentHTML('beforeend', markUp);
}

export function onFetchError(error) {
    console.log('Это CATCH!!!');            
    console.dir(error);
    alert('Упс, что-то пошло не так');
}

function clearResult() {   
    refs.cardContainer.innerHTML = '';
}

const debounce = require('lodash.debounce');
const refs = getRefs();

refs.searchForm.addEventListener('input', debounce(onSearch, 500));

const onEntry = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && imageApiService.query !== '') {
            console.log('it is time to load more images');
            imageApiService.fetchArticles().then(renderArticlesCard)
                .catch(onFetchError);  
        }
    });
};

const options = {
    rootMargin: '350px',
};

const observer = new IntersectionObserver(onEntry, options);
observer.observe(refs.sentinel);

