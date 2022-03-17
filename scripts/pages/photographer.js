/* Je récupére l'ID du photograph */
const id = window.location.search.split('id=')[1];
let totalLikes = parseInt(0)
console.log(id)

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
                    console.log(photographPrice)
                }
            });
    }
}

class AppMedia {
    constructor() {
        this.photographMedias = document.querySelector('.photograph-medias') 
        this.mediasApi = new MediaApi('/data/photographers.json')
    }

    async media() {
        const medias = await this.mediasApi.getMedia()
        medias
            .map(media => new Media(media) )
            .forEach(media => {
                if(media._photographerId == id) {
                    const Template = new MediaTemplate(media)
                    this.photographMedias.appendChild(Template.createTemplateMedia())
                    totalLikes +=  media.likes
                    document.querySelector('.photograph-medias__counter p#total-likes').innerHTML = totalLikes + ' <i class="fas fa-heart black" aria-label="likes"></i>'
                }
            });
    }
}

let app = new App()
app.photograph()

const appMedia = new AppMedia()
appMedia.media()

