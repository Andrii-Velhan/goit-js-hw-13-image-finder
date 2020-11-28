const BASE_URL = `https://pixabay.com/api/`;
const MY_KEY = `19199733-53a137615acbd00e25277177c`;

export default class ImageApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.per_page = 12;
     }
    
    fetchArticles() {
        const searchParams = new URLSearchParams({
            image_type: 'photo',
            orientation: 'horizontal',
            q: this.searchQuery,
            page: this.page,
            per_page: this.per_page,
            key: MY_KEY, 
        });
     
        const url = `${BASE_URL}?${searchParams}`;

        console.log('this from API:', this);
      
        return fetch(url)
            .then(r => r.json())
            .then((data) => {                
                this.incrementPage();
                console.log('this is hits from API:', data.hits);
                return data;
            }); 
    }

    incrementPage() {
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
