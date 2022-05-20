class App {
    constructor() {
        this.photographContainer = document.querySelector('.photographer_section')
        this.photographersApi = new PhotographersApi('/data/photographers.json')
    }

    async main() {
        const photographers = await this.photographersApi.getPhotographers()
        photographers
            .map(photographer => new Photograph(photographer) )
            .forEach(photographer => {
                const Template = new ProfilPhotographer(photographer)
                this.photographContainer.appendChild(Template.createProfilPhotographer())
            });
    }
}

const app = new App();
app.main();