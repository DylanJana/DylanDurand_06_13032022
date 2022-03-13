class PhotographTemplate {
    constructor(photographer) {
        this.photographer = photographer;
    }


    createTemplatePhotograph() {
        const photographHeaderContainer = document.createElement('article');
        photographHeaderContainer.classList.add('photographer-header__content','row-has--columns', 'd-flex', 'justify-content--space-between', 'align-items--center', 'w-100')
        photographHeaderContainer.setAttribute('aria-label', 'Photograph Profil');
        const templatePhotograph = `
        <!-- Je crée une div afin de faire de la mise en page avec flexbox-->
        <div class="column">
            <h1 class="photograph-header__title color-secondary title--xxl w-100" role="heading">${this.photographer.name}</h1>
            <p class="photographer-location title--md color-primary">${this.photographer.location}</p>
            <p class="photographer-tagline color-tiers mtb-md">${this.photographer.tagline}</p>
        </div>
        <div class="column">
        <button class="contact_button" onclick="displayModal()" role="button" alt="Contact Me">Contactez-moi</button>
        </div>
        <div class="column">
        <img class="img--rounded"
        src="${this.photographer.portrait}" 
        alt="${this.photographer.name}"
        />
        </div>
        `
        photographHeaderContainer.innerHTML = templatePhotograph
        return photographHeaderContainer
    }
}
