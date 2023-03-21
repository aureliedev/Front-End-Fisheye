/**********  Gestion du formulaire de contact  *******/

/** DOM **/
const body = document.querySelector("body");
const header = document.querySelector("header");
const main = document.querySelector("main");
const contactButton = document.querySelector(".contact_button");
const closeButton = document.querySelector(".close_button");
const modal = document.getElementById("contact_modal");
const form = document.querySelector("form");
const firstNameInput = document.getElementById("firstname");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const focusableElements = Array.from(
  document.getElementsByClassName("focusable-element")
);

contactButton.addEventListener("click", displayModal);
closeButton.addEventListener("click", closeModal);
closeButton.addEventListener("keypress", closeModal);

modal.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendForm();
});

/** afficher le formulaire de contact */
function displayModal() {
  body.style.overflow = "hidden";
  modal.style.display = "block";
  header.setAttribute("aria-hidden", true);
  main.setAttribute("aria-hidden", true);
  modal.setAttribute("aria-hidden", false);
  modal.setAttribute("tabindex", 0);
  focusableElements.forEach((element) => element.setAttribute("tabindex", -1));
  firstNameInput.focus();
}

/** fermer le formulaire de contact */
function closeModal() {
  body.style.overflow = "scroll";
  modal.style.display = "none";
  header.setAttribute("aria-hidden", false);
  main.setAttribute("aria-hidden", false);
  modal.setAttribute("aria-hidden", true);
  focusableElements.forEach((element) => element.setAttribute("tabindex", 0));
}

/** envoi du formulaire de contact */
function sendForm() {
  const sendDatas = {
    firstname: firstNameInput.value,
    name: nameInput.value,
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(sendDatas);
  closeModal();
  clearFields();
}
/** effacer les champs lors de l'envoi du formulaire */
function clearFields() {
  firstNameInput.value = "";
  nameInput.value = "";
  emailInput.value = "";
  messageInput.value = "";
}
