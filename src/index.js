import './styles.css';
//import './js/if';
import './js/io';
import articlesCardTpl from './templates/image-card.hbs'
// import articlesListTpl from './templates/image-card.hbs'
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

function onSearch(e) {
    e.preventDefault();

    clearResult();
    //imageApiService.query = e.currentTarget.elements.query.value;
    imageApiService.query = e.target.value;
    imageApiService.resetPage();
    // imageApiService.fetchArticles().then(articles => console.log(articles));
   
    if (imageApiService.query.length === 0) {
        clearResult();
        return
    }

    if (imageApiService.query === ' ' ||
        imageApiService.query === '  ' ||
        imageApiService.query === '   ') {        
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
    // .then(e => renderArticlesCard(e.hits))
}

function renderArticlesCard(hits) {
    const markUp = articlesCardTpl(hits);  
    
    console.log('renderArticlesCard is working');
    refs.cardContainer.insertAdjacentHTML('beforeend', markUp);
}

function onFetchError(error) {
    console.log('Это CATCH!!!');            
    console.dir(error);
    alert('Упс, что-то пошло не так');
}

function clearResult() {   
    refs.cardContainer.innerHTML = '';
}

function onLoadMore() {
  imageApiService.fetchArticles().then(renderArticlesCard);   
}


