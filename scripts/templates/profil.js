class ProfilPhotographer {
    constructor(photographer) {
        this.photographer = photographer
    }

    createProfilPhotographer() {
        const article = document.createElement('article');

        const profilPhotographer = `
            <a href="photographer.html?id=${this.photographer.id}" role="link">
                <img src="/assets/photographers/${this.photographer.portrait}" alt="${this.photographer.name}" role="image" class="border-radius--100">
                <h2 role="heading" class="mbt-md title--xl color-secondary">${this.photographer.name}</h2>
            </a>
            <h3 role="heading" class="margin--0 color-primary">${this.photographer.location}</h3>
            <p class="mbt-sm title--sm">${this.photographer.tagline}</p>
            <p class="margin--0 color-tiers title--xs">${this.photographer.price} €/jour</p>
        `

        article.innerHTML = profilPhotographer;
        return article
    }
}