/* Je récupére l'ID du photograph */
const id = window.location.search.split('id=')[1];
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

const app = new App()
app.photograph()