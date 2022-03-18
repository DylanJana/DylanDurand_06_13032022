function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

let form = document.contact
let errorMessage = document.querySelectorAll('.error-message')
let inputError = document.querySelectorAll('input')
let textAreaError = document.querySelector('textarea')

// Cette fonction est une fonction globale qui regroupe toutes les fonctions de vérifications des champs du formulaire
let validate = function (){
  // Lorsque je soumets le formulaire, la fonction de callback se lance
  form.addEventListener("submit", function(e) {
    // Je verifie le champ #lastname, cette fonction renvoie true si la valeur de #lastname n'est pas vide
    // Et que la valeur de ce champ est supérieur ou égal à 2 caractères
    let firstNameVerify = function () {
      if(form.firstname && form.firstname.value != "" && form.firstname.value.length >= 2) {
        errorMessage[0].style.display = 'none'
        inputError[0].style.border = '0.8px solid #ccc'
        firstNameVerify = true
      } else {
        errorMessage[0].style.display = 'block'
        inputError[0].style.border = '2px solid black'
        e.preventDefault() // J'arrête le comportement par defaut du bouton submit
        firstNameVerify = false
      }
      return firstNameVerify
    }
    // Je verifie le champ #lastname, cette fonction renvoie true si la valeur de #lastname n'est pas vide
    // Et que la valeur de ce champ est supérieur ou égal à 2 caractères
    let lastNameVerify = function () {
      if(form.lastname && form.lastname.value != "" && form.lastname.value.length >= 2) {
        errorMessage[1].style.display = 'none'
        inputError[1].style.border = '0.8px solid #ccc'
        lastNameVerify = true
      } else {
        errorMessage[1].style.display = 'block'
        inputError[1].style.border = '2px solid black'
        e.preventDefault() // J'arrête le comportement par defaut du bouton submit
        lastNameVerify = false
      }
      return lastNameVerify
    }
    // Je verifie l'email, pour cela j'utilise un regex, je teste la valeur rentrer dans le champs et je renvoie une réponse
    function checkEmail(valueEmail) {
      let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return regex.test(valueEmail)
    }

    let emailVerify = function () {
      let valueEmail = document.getElementById("email")  ?   document.getElementById("email").value : "" ;
      // Si l'email a passé le test du regex et si elle n'est pas vide, je renvoie true
      if(checkEmail(valueEmail) && valueEmail.length !== "") {
        errorMessage[2].style.display = 'none'
        inputError[2].style.border = '0.8px solid #ccc'
        emailVerify = true
      // Sinon je renvoie un message d'erreur et ajouter un border rouge à mon input
      } else {
        errorMessage[2].style.display = 'block'
        inputError[2].style.border = '2px solid black'
        e.preventDefault() // J'arrête le comportement par defaut du bouton submit
        emailVerify = false
      }
    }

    // Je verifie le champ textarea, cette fonction renvoie true si la valeur de textarea n'est pas vide
    let textAreaVerify = function () {
        if(form.message && form.message.value != "") {
          errorMessage[3].style.display = 'none'
          textAreaError.style.border = '0.8px solid #ccc'
          textAreaVerify = true
        } else {
          errorMessage[3].style.display = 'block'
          textAreaError.style.border = '2px solid black'
          e.preventDefault() // J'arrête le comportement par defaut du bouton submit
          textAreaVerify = false
        }
        return textAreaVerify
      }

    // J'appelle toutes mes fonctions
    firstNameVerify()
    lastNameVerify ()
    emailVerify()
    textAreaVerify()

    if(firstNameVerify && lastNameVerify && emailVerify && textAreaVerify) {
        console.log('Prénom du client : ' + form.firstname.value)
        console.log('Nom du client : ' + form.lastname.value)
        console.log('Email du client : ' + form.email.value)
        console.log('Message du client : ' + form.message.value)
    }

    // SI toutes les étapes du formulaire sont égales à TRUE alors j'affiche le message de remerciement SINON je relance la fonction validate
    let confirmMessage = function () {
      if (firstNameVerify && lastNameVerify && emailVerify && textAreaVerify) {
        let modalBodyContent = document.querySelector('form')
        let titleChange = document.querySelector('header div h2' )
        modalBodyContent.innerHTML = '<div class ="confirm-message"><p class="text--center title--xl">Le résultat du formulaire se trouve dans la console</p></div>'
        titleChange.classList.add('text--center')
        titleChange.textContent ='Notre photographe vous remercie'
        e.preventDefault()
        let crossReload = document.querySelector('.close')
        crossReload.setAttribute("onClick", "window.location.reload()")
      }
    }
    console
    confirmMessage()
  })
}
validate()
document.querySelector("form").reset();