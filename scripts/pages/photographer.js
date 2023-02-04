//Mettre le code JavaScript lié à la page photographer.html

let params = new URL(document.location).searchParams;
let photographerId = params.get("id");

let totalLikes = 0;
let photographerPrice = 0;

console.log(photographerId);

/** fonction pr récup les photographes **/
async function getPhotographers() {
  const data = await (await fetch("../../data/photographers.json")).json();
  const photographer = data.photographers.find(
    (photographer) => photographer.id == photographerId
  );
  return photographer;
}

/** récup les médias des photographes **/
async function getPhotographerMedias() {
  const data = await (await fetch("../../data/photographers.json")).json();
  const photographerMedias = data.media.filter(
    (media) => media.photographerId == photographerId
  );
  return photographerMedias;
}

getPhotographerMedias();

/** Affiche la data **/
async function displayData(photographer, medias) {
  photographerPrice = photographer.price;

  const main = document.getElementById("main");
  const photographerHeader = document.querySelector(".photograph-header");
  const contactButton = document.querySelector(".contact_button");
  const photographerModel = photographerFactory(photographer);
  const photographerInfos = photographerModel.getPhotographerProfileHeader();
  photographerHeader.insertBefore(photographerInfos, contactButton);

  const photographerImage = document.createElement("img");
  photographerImage.setAttribute("src", photographerModel.picture);
  photographerImage.setAttribute("alt", `photo de ${photographerModel.name}`);

  photographerHeader.appendChild(photographerImage);

  const mediasContainer = document.createElement("div");
  mediasContainer.classList.add("media-container");

  medias.forEach((media, index) => {
    totalLikes += media.likes;

    let liked = false;

    const medialModel = mediaFactory(media);
    const mediaCard = medialModel.getPhotographerMediaCards();

    const likeButton = mediaCard.querySelector(".likes");
    likeButton.addEventListener("click", (e) => {
      liked = !liked;
      likeMedia(e, media, liked, mediaCard, totalLikes);
    });

    mediaCard.setAttribute("tabindex", 0);
    mediaCard.addEventListener("click", () =>
      openCarousel(main, media, medias, index)
    );
    mediaCard.addEventListener("keypress", () =>
      openCarousel(main, media, medias, index, totalLikes)
    );

    mediasContainer.appendChild(mediaCard);
    totalLikes += media.likes;
  });

  main.appendChild(mediasContainer);

  const infosBlock = document.querySelector(".info-block");
  const totalLikesDisplay = infosBlock.querySelector(".info-block-likes");
  const priceDisplay = infosBlock.querySelector(".info-block-price");
  totalLikesDisplay.innerHTML = `${totalLikes} <i aria-label="likes" class="fa-solid fa-heart"></i>`;
  priceDisplay.innerHTML = `${photographerPrice} €/jour`;
}

async function init() {
  const photographer = await getPhotographers();
  const medias = await getPhotographerMedias();
  displayData(photographer, medias);
}

init();
