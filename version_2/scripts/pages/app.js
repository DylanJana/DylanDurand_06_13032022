import { fetchPhotographersJSON } from "./getData.js";
import { addAvatarToPhotographer } from "./avatar.js";

const wrapperPhotographers = document.querySelector(".wrapper");
const spanTags = document.getElementsByClassName("navigation__link");

export let photographers= [];

fetchPhotographersJSON()
    .then(data =>{
        for(let i = 0; i < data.photographers.length; i++){
            photographers[i] = data.photographers[i];
            addPhotographerInDOM(photographers[i]);
        }
    })
    .finally(()=>{
        Array.from(spanTags, tag =>{
            tag.addEventListener("click", () => {filterByTag(tag)})
            tag.addEventListener("keypress", (e) => {
                if(e.key === "Enter"){
                    filterByTag(tag)
                }
            })
        })
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

const filterByTag = (tag) =>{
    flushPhotographersInDOM();
    if(tag.classList.contains("tags-active")){
        tag.classList.toggle("tags-active");
        tag.setAttribute("aria-label", `tag ${tag.textContent.slice(1)} désélectionné`)
        tag.setAttribute("aria-label", `tag ${tag.textContent.slice(1)}`)
        tag.removeAttribute("aria-selected");
        tag.blur();
        photographers.forEach(photographer =>{
            addPhotographerInDOM(photographer);
        });
    } else{
        for(let i=spanTags.length; i > 0; i--){
            if(spanTags[i-1].classList.contains("tags-active")){
                spanTags[i-1].classList.toggle("tags-active");
                spanTags[i-1].setAttribute("aria-label", `tag ${spanTags[i-1].textContent.slice(1)}`);
                spanTags[i-1].removeAttribute("aria-selected");
                break;
            }
        }
        tag.classList.toggle("tags-active");
        tag.setAttribute("aria-label", `tag ${tag.textContent.slice(1)} sélectionné`)
        tag.setAttribute("aria-selected", "true")
        for(let i=0; i < photographers.length; i++){
            for(let j=photographers[i].tags.length; j > 0; j--){
                if("#"+ photographers[i].tags[j-1].charAt(0).toUpperCase() + photographers[i].tags[j-1].slice(1) == tag.textContent ){
                    addPhotographerInDOM(photographers[i]);
                    break;
                }
            }
        }
    }
}

const flushPhotographersInDOM = () =>{
    while(wrapperPhotographers.firstChild){
        wrapperPhotographers.firstChild.remove();
    }
}


