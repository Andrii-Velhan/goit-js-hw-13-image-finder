import InfiniteScroll from 'infinite-scroll';

var unsplashID = '9ad80b14098bcead9c7de952435e937cc3723ae61084ba8e729adb642daf0251';

const infScroll = new InfiniteScroll('.container', {
    responseType: 'text',
    history: false,
    path() {
        // const url = `https://api.unsplash.com/photos?client_id=${unsplashID}&page=${this.pageIndex}`;

        return `https://api.unsplash.com/photos?client_id=${unsplashID}&page=${this.pageIndex}`;
  }
});


infScroll.loadNextPage();

infScroll.on('load', (response, path) => {
    console.log(JSON.parse(response));
    // по шаблону строку с тегами
    // потом кинули в фрагмент 
    //fragment передали в infScroll.appendItems(фрагмент)
});

const markup = '<p>qweqwe</p>';

const fragment = new DocumentFragment();
// const d = document.createElement('div');

fragment.innerHTML = markup;

console.log(fragment);