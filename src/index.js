import './styles.css';
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
    
    imageApiService.fetchArticles().then(renderArticlesCard).catch(onFetchError);
    // .then(e => renderArticlesCard(e.hits))
}

function renderArticlesCard(articles) {
    const markUp = articlesCardTpl(articles);      
    // if (articles.status === 404 && articles.length === 0) {
    //     clearResult();
    //     return error({
    //         text: 'The articles for your request was not found. Please try again',
    //         type: 'info',
    //         delay: 2500           
    //     });        
    // }     
    refs.cardContainer.insertAdjacentHTML('beforeend', markUp);
    console.log('renderArticlesCard is working');
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


