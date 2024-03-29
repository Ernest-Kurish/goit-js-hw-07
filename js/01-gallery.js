
import { galleryItems } from "./gallery-items.js";

const galleryContainer = document.querySelector(".gallery");
const imagesCardsMarkup = createImgCardsMarkup(galleryItems);

// CREATE IMG MARKUP
function createImgCardsMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </div>
      `;
    })
    .join("");
}

// IMG MARKUP
galleryContainer.insertAdjacentHTML("beforeend", imagesCardsMarkup);

// OPEN MODAL WINDOW
function openModalWindow(e) {
  const originalImgLink = e.target.dataset.source;
  const originalImgModalMarkup = basicLightbox.create(
    `<img src="${originalImgLink}">`
  );
  originalImgModalMarkup.show();

  // ADD CSS RULES
  const imgElement = originalImgModalMarkup.element().querySelector('img');
  imgElement.style.position = 'fixed';
  imgElement.style.top = '0';
  imgElement.style.left = '0';
  imgElement.style.width = '100%';
  imgElement.style.height = '100%';

  // ADD EVENT
  window.addEventListener("keydown", onEscapeClick);

  // ESCAPE
  function onEscapeClick(e) {
    if (e.key === "Escape") {
      closeModalWindow();
      window.removeEventListener("keydown", onEscapeClick);
    }
  }

  // CLOSE MODAL WINDOW
  function closeModalWindow() {
    originalImgModalMarkup.close();
  }
}

// IMG CLICK
function onGalleryContainerClick(e) {
  if (e.target.nodeName !== "IMG") {
    return;
  }
  e.preventDefault(); // Prevent default link behavior
  openModalWindow(e);
}

// EVENT LISTENERS
galleryContainer.addEventListener("click", onGalleryContainerClick);
