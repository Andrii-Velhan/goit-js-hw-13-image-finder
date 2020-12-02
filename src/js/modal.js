import * as basicLightbox from 'basiclightbox';
import getRefs from './get-refs';
const refs = getRefs();


refs.cardContainer.addEventListener('click', onClickImg)

function onClickImg(event) {
    const basicLightbox = require('basiclightbox')
  if (event.target.nodeName !== 'IMG')
  {
    return
    }
    const instance = basicLightbox.create(`<img src="${event.target.dataset.sourse}">`)
    console.log(event.target.dataset.sourse);
    instance.show()
}