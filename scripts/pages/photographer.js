/* Je récupére l'ID du photograph */
const id = window.location.search.split('id=')[1];
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
                    console.log(media)
                    const Template = new MediaTemplate(media)
                    this.photographMedias.appendChild(Template.createTemplateMedia())
                }
            });
    }
}

let app = new App()
const appMedia = new AppMedia()
app.photograph()
appMedia.media()