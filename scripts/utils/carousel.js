/************** CAROUSEL *******************/
const carouselCloseButton = document.querySelector(".close-carousel");
const previousButton = document.querySelector(".previous-slide");
const carouselModal = document.getElementById("carousel_modal");
const nextButton = document.querySelector(".next-slide");

const video = carouselModal.querySelector("video");
const image = carouselModal.querySelector("img");
const title = carouselModal.querySelector("h2");

let currentIndex = undefined;
let mediasSlide = [];
let mediaCards = [];

/****** addEventListener *******/
carouselCloseButton.addEventListener("click", closeCarousel);
carouselCloseButton.addEventListener("keypress", closeCarousel);

previousButton.addEventListener("click", showPrevious);
previousButton.addEventListener("keypress", showPrevious);

nextButton.addEventListener("click", showNext);
nextButton.addEventListener("keypress", showNext);

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    showPrevious();
  } else if (e.key === "ArrowRight") {
    showNext();
  } else if (e.key === "Escape") {
    closeCarousel();
  }
});

/** fonction openCarousel */
function openCarousel(main, media, medias, index) {
  main.setAttribute("aria-hidden", true);
  mediaCards = Array.from(main.querySelectorAll(".media-card"));
  mediaCards.forEach((card) => card.setAttribute("tabindex", -1));
  carouselModal.setAttribute("aria-hidden", false);

  mediasSlide = medias;
  currentIndex = index;

  carouselModal.style.display = "block";
  carouselCloseButton.focus();
  title.textContent = medias[index].title;

  if (media.image) {
    image.style.display = "block";
    video.style.display = "none";
    image.setAttribute(
      "src",
      `../../assets/images/medias/${medias[index].image}`
    );
    image.setAttribute("alt", `Titre de l'image: ${medias[index].title}`);
  }
  if (media.video) {
    video.style.display = "block";
    image.style.display = "none";
    video.setAttribute(
      "src",
      `../../assets/images/medias/${medias[index].video}`
    );
  }
}

/** fonction showPrevious */
function showPrevious() {
  if (currentIndex > 0) {
    if (mediasSlide[currentIndex - 1].image) {
      image.setAttribute(
        "src",
        `../../assets/images/medias/${mediasSlide[currentIndex - 1].image}`
      );
      image.setAttribute(
        "alt",
        `Titre de l'image: ${mediasSlide[currentIndex - 1].title}`
      );

      video.style.display = "none";
      image.style.display = "block";
    } else {
      video.setAttribute(
        "src",
        `../../assets/images/medias/${mediasSlide[currentIndex - 1].video}`
      );
      image.style.display = "none";
      video.style.display = "block";
    }
    currentIndex -= 1;
  } else {
    if (mediasSlide[mediasSlide.length - 1].image) {
      image.setAttribute(
        "src",
        `../../assets/images/medias/${
          mediasSlide[mediasSlide.length - 1].image
        }`
      );
      video.style.display = "none";
      image.style.display = "block";
    } else {
      video.setAttribute(
        "src",
        `../../assets/images/medias/${
          mediasSlide[mediasSlide.length - 1].video
        }`
      );
      image.style.display = "none";
      video.style.display = "block";
    }
    currentIndex = mediasSlide.length - 1;
  }
  title.textContent = mediasSlide[currentIndex].title;
  console.log("mediaindex :", currentIndex);
}

/** fonction showNext */
function showNext() {
  if (currentIndex < mediasSlide.length - 1) {
    if (mediasSlide[currentIndex + 1].image) {
      image.setAttribute(
        "src",
        `../../assets/images/medias/${mediasSlide[currentIndex + 1].image}`
      );
      image.setAttribute(
        "alt",
        `Titre de l'image: ${mediasSlide[currentIndex + 1].title}`
      );

      video.style.display = "none";
      image.style.display = "block";
    } else {
      video.setAttribute(
        "src",
        `../../assets/images/medias/${mediasSlide[currentIndex + 1].video}`
      );
      image.style.display = "none";
      video.style.display = "block";
    }
    currentIndex += 1;
  } else {
    if (mediasSlide[0].image) {
      image.setAttribute(
        "src",
        `../../assets/images/medias/${mediasSlide[0].image}`
      );
      video.style.display = "none";
      image.style.display = "block";
    } else {
      video.setAttribute(
        "src",
        `../../assets/images/medias/${mediasSlide[0].video}`
      );
      image.style.display = "none";
      video.style.display = "block";
    }
    currentIndex = 0;
  }
  title.textContent = mediasSlide[currentIndex].title;
}

/** fonction closeCarousel ***/
function closeCarousel() {
  carouselModal.style.display = "none";
  main.setAttribute("aria-hidden", false);
  mediaCards.forEach((card) => card.setAttribute("tabindex", 0));
  carouselModal.setAttribute("aria-hidden", true);
}
