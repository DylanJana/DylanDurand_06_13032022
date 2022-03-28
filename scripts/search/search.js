import {appMedia as firstPart} from '../pages/photographer.js';
import {favoritesMedias} from '../pages/photographer.js';
import {id} from '../pages/photographer.js';



class TriMedia {
    constructor() {
        this.mediasApi = new MediaApi('/data/photographers.json');
        this.init();
    }
    async init() {
        const medias = await this.mediasApi.getMedia()
        firstPart.displayMedias(medias);
    }

    async triMediaByPopular() {
        // J'utilise ma fonction pour récupérer la valeur choisie par l'utilisateur
        const medias = await this.mediasApi.getMedia()
        let mediaArray = []
            medias
                .map(media => new Media(media))
                .forEach(media => {
                    if(media.photographerId == id) {
                        mediaArray.push(media)
                    }
                });
                console.log(favoritesMedias)
                console.log(mediaArray)
                const testArray = mediaArray.sort((a,b) => (a.likes < b.likes) ? 1 : 0)
                console.log('solution : ', testArray[0].photographerId) 
                firstPart.displayMedias(testArray);
               

    }
}
let triAllMedias = new TriMedia();
triAllMedias.triMediaByPopular();

/*** Si favoritesMedias[i] === media[i].likes
 *      mediaArray.push(media) ***/

