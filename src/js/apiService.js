export default class ImageApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.per_page = 5;
     }
    
    fetchArticles() {
        console.log('this from API:', this);

        const BASE_URL = `https://pixabay.com/api/`;
        const MY_KEY = `19199733-53a137615acbd00e25277177c`;
          
        return fetch(`${BASE_URL}?image_type=photo
        &orientation=horizontal
        &q=${this.searchQuery}
        &page=${this.page}
        &per_page=${this.per_page}
        &key=${MY_KEY}`)
            .then(r => r.json())
            .then(({hits}) => {                
                this.incremnetPage();
                console.log('this is hits from API:', hits);
                return hits;
            }); 
    }

    incremnetPage() {
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}
