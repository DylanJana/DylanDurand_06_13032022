class MediaTemplate {
    constructor(media) {
        this.media = media;
    }


    createTemplateMedia() {
        const mediaContainer = document.createElement('article');
        mediaContainer.setAttribute('aria-label', 'media');
        const mediaPhotograph = `
        <!-- Je crée mon template pour un media-->
        <div>
            <a href="#" role="link">
                <img src="${this.media.image}"
                alt="${this.media.title}" 
                role="image-link"
                class="photographer-media__picture" />
            </a>
        </div>
        <section class="row-has--columns d-flex justify-content--space-between align-items--center mb-lg">
            <div class="column">
                <p class="title--md color-primary">${this.media.title}</p>
            </div>
            <div class="column d-flex align-items--center">
                <p class="d--inline-block">${this.media.likes}</p>
                <a href="javascript:void(0);" role="link"><i class="fas fa-heart color-primary" aria-label="likes"></i></a>
            </div>
        </div>
        `
        mediaContainer.innerHTML = mediaPhotograph
        return mediaContainer
    }
}