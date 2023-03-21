/*********** page index (homePage) **********/

/*** retourne la data des photographes *****/
async function getPhotographers() {
  const data = await (await fetch("../../data/photographers.json")).json();
  console.log("data", data);
  const photographers = data.photographers;
  return { photographers: [...photographers] };
}

/*** affiche les photographes sur la page d'index *****/
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const PhotographerProfileCard =
      photographerModel.getPhotographerProfileCard();
    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?id=${photographer.id}`);
    link.setAttribute("title", `Profils des ${photographer.name}`);
    link.style.textDecoration = "none";
    link.appendChild(PhotographerProfileCard);
    photographersSection.appendChild(link);
  });
}

/*** affiche les photographes sur la page index lors du chargement de la page ****/
async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
