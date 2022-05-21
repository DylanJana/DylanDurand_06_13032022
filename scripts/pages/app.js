import { fetchPhotographersJSON } from "./api/getData.js";
import { addAvatarToPhotographer } from "./parts/avatar.js";

const wrapperPhotographers = document.querySelector(".wrapper");

export let photographers= [];

fetchPhotographersJSON()
    .then(data =>{
        for(let i = 0; i < data.photographers.length; i++){
            photographers[i] = data.photographers[i];
            addPhotographerInDOM(photographers[i]);
        }
    })
    .finally(()=>{
        window.addEventListener("scroll", () => {
            let anchor = document.querySelector(".anchor");
            let y = window.scrollY;
            if (y >= 160) {
                anchor.style.display = "block";
            } else {
                anchor.style.display = "none";
            }
            
            })
        
    })

const addPhotographerInDOM = (photographer) =>{
    const divPhotographer = document.createElement("div");
    divPhotographer.classList.add("photographer")
    wrapperPhotographers.appendChild(divPhotographer);
    divPhotographer.innerHTML=  `<a class="photographer__link" href="./photographer.html?id=${photographer.id}">
                                <img class="photographer__avatar" src="assets/images/${addAvatarToPhotographer(photographer.name)}" alt="${photographer.name}">
                                <h2 class="photographer__name">${photographer.name}</h2></a>
                                <p class="photographer__text" tabindex="0"><span class="photographer__localisation">${photographer.city}, ${photographer.country}</span>
                                <span class="photographer__tagline">${photographer.tagline}</span>
                                <span class="photographer__price">${photographer.price}€/jour</span></p> `;
}


