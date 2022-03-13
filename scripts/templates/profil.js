class ProfilPhotographer {
    constructor(photographer) {
        this._photographer = photographer
    }

    createProfilPhotographer() {
        const $article = document.createElement('article');
        //$article.classList.add('')

        const profilPhotographer = `
            <a href="#" role="link">
                <img src="${this._photographer.portrait}" alt="${this._photographer.name}" role="image" class="border-radius--100">
                <h2 role="heading" class="mbt-md title--xl">${this._photographer.name}</h2>
            </a>
            <h3 role="heading" class="margin--0 color-primary">${this._photographer.location}</h3>
            <p class="mbt-sm title--sm">${this._photographer.tagline}</p>
            <p class="margin--0 color-tiers title--xs">${this._photographer.price} €/jour</p>
        `

        $article.innerHTML = profilPhotographer;
        return $article
    }
}