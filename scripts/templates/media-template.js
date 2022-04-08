export default class MediaTemplate {
    constructor(media) {
        this.media = media
    }

    createTemplateMedia() {
        const mediaContainer = document.createElement('article');
        mediaContainer.setAttribute('aria-label', 'media');
        let mediaPhotograph =
        `
        <!-- Je crée mon template pour un media-->
        <div class="photographer__media">
            <a href="javascript:void(0);" role="link">
                <img src="/assets/images/${this.media.image}"
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
                <a href="javascript:void(0);" role="link" class="love-btn"><i class="fas fa-heart" aria-label="likes"></i></a>
            </div>
        </div>
        `
        if (this.media.video !== undefined) {
            mediaPhotograph =
        `
        <!-- Je crée mon template pour un media-->
        <div>
            <a href="#" role="link">
            <video 
            width="450px"
            height="450px"
            poster="${this.media.poster}">
                <source src="/assets/images/${this.media.video}"
                        type="video/mp4"">
            </video>
            </a>
        </div>
        <section class="row-has--columns d-flex justify-content--space-between align-items--center mb-lg">
            <div class="column">
                <p class="title--md color-primary">${this.media.title}</p>
            </div>
            <div class="column d-flex align-items--center">
                <p class="d--inline-block">${this.media.likes}</p>
                <a href="javascript:void(0);" class="love-btn" role="link"><i class="fas fa-heart color-primary" aria-label="likes"></i></a>
            </div>
        </div>
        `
        }

        mediaContainer.innerHTML = mediaPhotograph
        return mediaContainer
    }

    createTemplateLightBox() {
        const containerLightBox = document.querySelector('#galerie')
        let templateLightBox = `
        <div class="modal-galerie" role="dialog" aria-label="image closeup view">
            <header role="header">
                <a href="javascript:void(0);" class="modal-galerie__cross">
                <i class="fas fa-times" aria-hidden="true" alt="Close dialog" role="button" onclick="close()" class="close-lightbox-icon"></i>
                </a>
            </header>
            <div class="arrows__container">
                <a href="javascript:void(0);" class="left-arrow-lightbox">
                    <i class="fas fa-angle-left" role="button" alt="Previous image"></i>
                </a>
                <a href="javascript:void(0);" class="right-arrow-lightbox">
                    <i class="fas fa-angle-right" alt="Next image"></i>
                </a>
            </div>
            <div class="modal-galerie__image">
            <img src="/assets/images/${this.media.image}" alt="${this.media.title}" id="lightbox__media">
            </div>
            <p id="lightbox__name">${this.media.title}</p>
      </div>
        `

        containerLightBox.innerHTML = templateLightBox;
        return containerLightBox
    }
}