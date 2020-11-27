import InfiniteScroll from 'infinite-scroll';

// var unsplashID =
//     '9ad80b14098bcead9c7de952435e937cc3723ae61084ba8e729adb642daf0251';

const BASE_URL = `https://pixabay.com/api/`;
        const MY_KEY = `19199733-53a137615acbd00e25277177c`;

const infScroll = new InfiniteScroll('.container', {
    responseType: 'text',
    history: false,
    path() {
        // const url = `https://api.unsplash.com/photos?client_id=${unsplashID}&page=${this.pageIndex}`;

        // return `https://api.unsplash.com/photos?client_id=${unsplashID}&page=${this.pageIndex}`;
        return `${BASE_URL}?image_type=photo
        &orientation=horizontal
        &q=${this.searchQuery}
        &page=${this.page}
        &per_page=${this.per_page}
        &key=${MY_KEY}`;
  }
});

infScroll.loadNextPage();

infScroll.on('load', (response, path) => {
    console.log(JSON.parse(response));
    // по шаблону строку с тегами
    // потом кинули в фрагмент 
    //fragment передали в infScroll.appendItems(фрагмент)
});

// const markup = '<p>qweqwe</p>';
// const fragment = new DocumentFragment();
// // const d = document.createElement('div');

// fragment.innerHTML = markup;
// console.log(fragment);