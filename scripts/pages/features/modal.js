import { photographer } from "../photographers.js";

const closeModalBtn = document.querySelector(".modal__close");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal__title");
const submitBtn = document.querySelector(".modal__btn");
const lastName = document.getElementById("lastname");
const firstName = document.getElementById("firstname");
const email = document.getElementById("email");
const regex = {
    mail: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    name: /^[a-zA-ZÀ-Ÿà-ÿ]+([\s\'\.\-][a-zA-ZÀ-Ÿà-ÿ]+)?([\s\'\.\-][a-zA-ZÀ-Ÿà-ÿ]+)*$/
  };

export const openModal = e =>{
    e.preventDefault();
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-modal", "true");
    closeModalBtn.focus();
    modalTitle.innerHTML = `Contactez-moi<br><span class="modal__photographer">${photographer.name}</span>`;

}

const closeModal = () =>{
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("aria-modal", "false");   
}
closeModalBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape" && modal.getAttribute("aria-hidden") == "false"){
        closeModal();
    }
})

submitBtn.addEventListener("click", e =>{
    e.preventDefault();
    if( validText(firstName.value, regex.name, firstName) &
        validText(lastName.value, regex.name, lastName) &
        validText(email.value, regex.mail, email)){
        console.log(`Prénom: ${firstName.value}`);
        console.log(`Nom: ${lastName.value}`);0.
        console.log(`Email: ${email.value}`);
        console.log(`Message: ${document.getElementById("message").value}`);
        closeModal();
    }

    
})

// validation d'un champ de texte
 const validText = (entry, regex, field) => {
    if (entry.match(regex) && entry.length >= 2) {
      return true;
    } else {
      let allInputs = document.querySelectorAll('input');
      allInputs.forEach((input) => {
        input.classList.add("input-error");
      });
      let errorMessage = document.querySelector('.error-message');
      errorMessage.style.display= "block";
      return false;
    }
  }