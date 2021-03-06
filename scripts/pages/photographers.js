import { addAvatarToPhotographer } from "./parts/avatar.js";
import { showDropdown } from "./filters/dropDown.js";
import { fetchPhotographersJSON } from "./api/getData.js";
import { Lightbox } from "./features/lightbox.js";
import { Likes } from "./features/likes.js";
import { MediaFactory } from "./parts/media.js";
import { openModal } from "./features/modal.js";


const urlParams = new URLSearchParams(window.location.search);
const photographerID = urlParams.get("id");

const wrapperPhotographer = document.querySelector(".infos");
const namePhotographer = document.querySelector(".infos__name");
const localisationPhotographer = document.querySelector(".infos__localisation");
const taglinePhotographer = document.querySelector(".infos__tagline");
const avatarPhotographer = document.createElement("img");
const wrapperMedias = document.querySelector(".medias__wrapper");
const pricePhotographer = document.querySelector(".likes__price");
const dropDownBtn = document.getElementById("sort-by");

export let photographer = {};
export let medias = [];


fetchPhotographersJSON()
    .then(data =>{
        for(let i = data.photographers.length; i > 0 ; i--){
            if(data.photographers[i-1].id === parseInt(photographerID)){
                photographer = data.photographers[i-1];
                break;
            }
        }
        for(let i = data.media.length; i > 0; i--){
            if(data.media[i-1].photographerId == photographer.id){
                let media = new MediaFactory().createMedia(data.media[i-1],photographer.name);
                medias.push(media);
            }
        }

    }) .finally( () =>{
        namePhotographer.innerHTML = photographer.name;
        localisationPhotographer.innerHTML = photographer.city + ", " + photographer.country;
        taglinePhotographer.innerHTML = photographer.tagline;
    
        avatarPhotographer.setAttribute("src", "../assets/images/"+ addAvatarToPhotographer(photographer.name));
        avatarPhotographer.classList.add("photographer__avatar");
        avatarPhotographer.classList.add("infos__avatar");
        wrapperPhotographer.appendChild(avatarPhotographer);
        medias.forEach(media => addMediasInDOM(media));
        dropDownBtn.addEventListener("click", showDropdown); // ajout du dropdown au clic du bouton de tri des medias
        document.querySelector(".contact__button").addEventListener("click", e => openModal(e)); // ajout de la modal au clic du bouton contactez moi
        Likes.init();
        Lightbox.init();
        pricePhotographer.innerHTML = `${photographer.price}??? / jour`
    })

export const addMediasInDOM = (media) =>{
    const mediaCard = document.createElement("div");
    mediaCard.classList.add("media__card");
    wrapperMedias.appendChild(mediaCard);
    mediaCard.innerHTML =  `${media.mediaHTML}
                            <div class="media__text"><span class="media__title">${media.title}</span>
                            <div class="media__likes"><p class="media__likes-number">${media.likes} </p><i class="far fa-heart media__heart"></i></div></div>`;
    
}

export const flushMediasInDOM = () =>{
    wrapperMedias.innerHTML = "";
}
