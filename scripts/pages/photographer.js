/* Je récupére l'ID du photograph */
export const id = window.location.search.split('id=')[1];
let totalLikes = parseInt(0)
let mediaLove = parseInt(0)
export let favoritesMedias = []


class App {
    constructor() {
        this.photographHeader = document.querySelector('.photograph-header')
        this.photographersApi = new PhotographersApi('/data/photographers.json')
    }

    async photograph() {
        const photographers = await this.photographersApi.getPhotographers()
        photographers
            .map(photographer => new Photograph(photographer) )
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
        this.mediasLoves = document.querySelector('p.d--inline-block')
    }

    async media() {
        console.log('test')
        const medias = await this.mediasApi.getMedia();

        let favoritesButtons = document.getElementsByClassName('love-btn')
        let picturesLoves = document.getElementsByClassName('d--inline-block')
        let result = this.countLikes
        for (let i = 0; i < favoritesButtons.length; i++) {
            let favoriteButton = favoritesButtons[i]
            let favoriteMedia = favoritesMedias[i]
            let pictureLove = picturesLoves[i]
            favoriteButton.addEventListener('click', function() {
                if(pictureLove.classList.contains('one')) {
                    pictureLove.classList.remove('one')
                    favoriteMedia--
                    totalLikes--
                    pictureLove.innerHTML = favoriteMedia
                } else {
                    pictureLove.classList.add('one')
                    picturesLoves = document.querySelector('.d--inline-block.one')
                    favoriteMedia++
                    totalLikes++
                    pictureLove.innerHTML = favoriteMedia
                }
                result.innerHTML = totalLikes + ' <i class="fas fa-heart black" aria-label="likes"></i>'
            })
        }
        
        //this.displayMedias(medias) ;
        
    }
    async displayMedias(medias) {
        console.log('medias-------',medias)
        this.photographHeader = document.querySelector('.photograph-header')
        this.photographHeader.innerHTML= '';
        medias
        .map(media => new Media(media) )
        .forEach(media => {
            console.log('media._photographerId',media.photographerId) ;
            console.log("idddd",id) ;
            if(media.photographerId == id) {
                console.log('inif----')
                const Template = new MediaTemplate(media)
                this.photographMedias.appendChild(Template.createTemplateMedia())
                totalLikes +=  media.likes
                this.countLikes.innerHTML = totalLikes + ' <i class="fas fa-heart black" aria-label="likes"></i>'
                mediaLove = media.likes
                const addMedia = favoritesMedias.push(mediaLove)
            }
        });
    }
}

let app = new App()
app.photograph()

export const appMedia = new AppMedia()
appMedia.media()