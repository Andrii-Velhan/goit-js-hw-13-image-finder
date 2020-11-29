const BASE_URL = `https://pixabay.com/api/`;
const MY_KEY = `19199733-53a137615acbd00e25277177c`;

export default class ImageApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.per_page = 12;
     }
    
    async fetchArticles() {
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
      
        try {
            const response = await fetch(url);
            const newData = await response.json()
                          
            this.incrementPage();
            console.log('this is hits from API:', newData.hits);
            return newData;
        } catch {}; 
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
