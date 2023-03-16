
import { galleryItems } from './gallery-items.js';

console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');
const imagesCardsMarkup = createImgCardsMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', imagesCardsMarkup);

// add simple-lightbox library styles
const linkStyles = document.createElement('link');
linkStyles.href = 'https://cdnjs.cloudflare.com/ajax/libs/simplelightbox/2.7.0/simplelightbox.min.css';
linkStyles.rel = 'stylesheet';
document.head.appendChild(linkStyles);

// add simple-lightbox library script
const scriptLibrary = document.createElement('script');
scriptLibrary.src = 'https://cdnjs.cloudflare.com/ajax/libs/simplelightbox/2.7.0/simple-lightbox.min.js';
document.body.appendChild(scriptLibrary);

// initialize simple-lightbox library
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });
});

// CREATE IMG MARKUP
function createImgCardsMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}" />
          </a>
        </div>`;
    })
    .join('');
}
