const BASE_URL = `https://pixabay.com/api/`;
const MY_KEY = `19199733-53a137615acbd00e25277177c`;
let page = 1;
const per_page = 12;
    

function fetchApiPictures(searchQuery) {
    return fetch(`${BASE_URL}?image_type=photo
    &orientation=horizontal
    &q=${searchQuery}
    &q=${page}
    &per_page=${per_page}
    &key=${MY_KEY}`)
        .then(r => r.json()); 
}

export default { fetchApiPictures };