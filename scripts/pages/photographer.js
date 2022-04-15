/* Je récupére l'ID du photograph */
export const id = window.location.search.split('id=')[1];
export let favoritesMedias = [];
import MediaTemplate from '../templates/media-template.js';
import {lightBox} from '../LightBox/lightbox.js';


class App {
    constructor() {
        this.photographHeader = document.querySelector('.photograph-header')
        this.photographersApi = new PhotographersApi('/data/photographers.json')
    }

    async photograph() {
        const photographers = await this.photographersApi.getPhotographers()
        photographers
            .map(photographer => new Photograph(photographer))
            .forEach(photographer => {
                if(photographer.id == id) {
                    const Template = new  PhotographTemplate(photographer)
                    this.photographHeader.appendChild(Template.createTemplatePhotograph())
                    let photographPrice = photographer.price
                    document.querySelector('.photograph-medias__counter div p#price-photograph').innerHTML = photographPrice + ' € / jour'
                }
            });
    }
}

class AppMedia {
    constructor() {
        this.photographMedias = document.querySelector('.photograph-medias')
        this.mediasApi = new MediaApi('/data/photographers.json')
        this.countLikes = document.querySelector('.photograph-medias__counter p#total-likes span.love-count')
    }

    async favoriteMedia(arr) {
        let sumLikes = 0;
        arr
            .map(media => new Media(media))
            .forEach(media => {
                if(media.photographerId == id) {
                    sumLikes += media.likes;
                }
            })

            let articlesMedias = document.querySelectorAll('.photograph-medias article');
            let newCountLikes = document.querySelector('.photograph-medias__counter p#total-likes span.love-count')
    
            for (let i = 0; i < articlesMedias.length; i++) {
                let articleMedia = articlesMedias[i];
                let loveBtn = articleMedia.querySelector('.love-btn')
                loveBtn.addEventListener('click', function() {
                    let likeThisMedia = articleMedia.querySelector('.d--inline-block');
                    if(likeThisMedia.classList.contains('one')) {
                        likeThisMedia.classList.remove('one')
                        let likeThisMediaValue = parseInt(likeThisMedia.innerHTML) - 1;
                        likeThisMedia.innerHTML = likeThisMediaValue;
                        sumLikes--
                        newCountLikes.innerHTML = sumLikes + ' <i class="fas fa-heart black" aria-label="likes"></i>';
                    } else {
                        likeThisMedia.classList.add('one')
                        likeThisMedia = articleMedia.querySelector('.d--inline-block.one');
                        let likeThisMediaValue = parseInt(likeThisMedia.innerHTML) + 1;
                        likeThisMedia.innerHTML = likeThisMediaValue;
                        sumLikes++
                        newCountLikes.innerHTML = sumLikes + ' <i class="fas fa-heart black" aria-label="likes"></i>';
                    }
                })
            }

            this.countLikes.innerHTML = sumLikes + ' <i class="fas fa-heart black" aria-label="likes"></i>'
    }
    async displayMedias(medias) {
        let currentMediasArray = [];
        medias
        .map(media => new Media(media) )
        .forEach(media => {
            if(media.photographerId == id) {
                const Template = new MediaTemplate(media)
                this.photographMedias.appendChild(Template.createTemplateMedia())
                currentMediasArray.push(media)
            }
        });
        lightBox.init(currentMediasArray)
    }
}

let app = new App()
app.photograph()

export let appMedia = new AppMedia()