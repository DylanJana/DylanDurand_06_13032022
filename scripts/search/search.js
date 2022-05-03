import {appMedia} from '../pages/photographer.js';
import {favoritesMedias} from '../pages/photographer.js';
import {id} from '../pages/photographer.js';
import{lightBox} from '../Lightbox/lightbox.js';

class TriMedia {
    constructor() {
        this.mediasApi = new MediaApi('/data/photographers.json');
        this.init()
    }
    async init() {
        const medias = await this.mediasApi.getMedia()
        appMedia.displayMedias(medias);
        appMedia.favoriteMedia(medias);
    }

    async triMediaByPopular() {
        const medias = await this.mediasApi.getMedia()
        let mediaArray = [];
            medias
                .map(media => new Media(media))
                .forEach(media => {
                    if(media.photographerId == id) {
                        mediaArray.push(media)
                    }
                });
                const popularArray = mediaArray.sort((a,b) => (a.likes < b.likes) ? 1 : 0); 
                appMedia.displayMedias(popularArray);
                appMedia.favoriteMedia(popularArray);
    }

    async triMediaByTitle() {
        const medias = await this.mediasApi.getMedia()
        let mediaArray = []
            medias
                .map(media => new Media(media))
                .forEach(media => {
                    if(media.photographerId == id) {
                        mediaArray.push(media)
                    }
                });
                const titlesArray = mediaArray.sort((a,b) => (a.title > b.title) ? 1 : 0)
                appMedia.displayMedias(titlesArray);
                appMedia.favoriteMedia(titlesArray);
    }
}
let triAllMedias = new TriMedia();

let selectValue = "default"
document.getElementById('tri').onchange = function() {valueSelect(selectValue)};
function valueSelect() {
    const selectId = document.getElementById('tri');
    let index = selectId.selectedIndex;
    let mediasPhotographer = document.querySelector('.photograph-medias');
    if (index === 1) {
        mediasPhotographer.innerHTML = '';
        triAllMedias.triMediaByPopular();
    } else if (index === 2) {
        mediasPhotographer.innerHTML = '';
        triAllMedias.triMediaByTitle();
    } else  {
        mediasPhotographer.innerHTML = '';
        triAllMedias.init();
    }
}

