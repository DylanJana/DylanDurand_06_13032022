import { Lightbox } from "../features/lightbox.js";
import { Likes } from "../features/likes.js";
import { addMediasInDOM, flushMediasInDOM, medias } from "../photographers.js";
const dropDownBtn = document.getElementById("sort-by");
const dropDownContent = document.querySelector(".sort__options");
const dropDownOptions = document.querySelectorAll(".sort__option");
const selectedOptions = document.querySelector(".sort__option__selected");


// Afficher la liste deroulante pour trier les medias
export const showDropdown = ()=>{
    dropDownBtn.setAttribute("aria-expanded","true");
    dropDownContent.classList.add("sort__show");
    dropDownOptions[0].focus();
}

// Ajoute les event listeners sur la liste deroulante pour pouvoir trier en fonction de l'option choisie
dropDownOptions.forEach(option => option.addEventListener("click", (e) => {
    e.stopPropagation();
    e.stopImmediatePropagation();
    dropDownContent.className = "sort__options";
    const classes = option.className.split(" ");
    sortMedias(classes[1]);
}));
dropDownOptions.forEach(option => option.addEventListener("keypress", (e) => {
    if(e.key ==="Enter"){
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        dropDownContent.className = "sort__options";
        const classes = option.className.split(" ");
        sortMedias(classes[1]);
    }

}));

const sortMedias = (by) => {
    switch(by){
        case "sort__option-1" : {
            medias.sort((a,b) =>  b.likes - a.likes);
            selectedOptions.innerHTML = `Popularité<i class="fas fa-chevron-down chevron__down"></i>`;
        }
        break;
        case "sort__option-2" : {
            medias.sort((b,a) => new Date(b.date) - new Date(a.date))
            selectedOptions.innerHTML = `Date<i class="fas fa-chevron-down chevron__down"></i>`;
        }
        break;
        case "sort__option-3" : {
            medias.sort((a,b) => {
                if(a.title.toLowerCase() < b.title.toLowerCase()){
                    return -1
                } else{
                    return 1;
                } 
            })
            selectedOptions.innerHTML = `Titre<i class="fas fa-chevron-down chevron__down"></i>`;
        }
        break;
    }    
    flushMediasInDOM();
    medias.forEach(media => addMediasInDOM(media));
    dropDownBtn.setAttribute("aria-expanded","false");
    Likes.init();
    Lightbox.init();

}
