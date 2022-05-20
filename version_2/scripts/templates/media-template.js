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
                    <a href="javascript:void(0);" class="love-btn" role="link"><i class="fas fa-heart color-primary" aria-label="likes"></i></a>
                </div>
            </div>
        `
        if (this.media.video !== undefined) {
            mediaPhotograph =
        `
        <!-- Je crée mon template pour un media-->
        <div class="photographer__media">
            <a href="javascript:void(0);" role="link">
            <video 
            width="450px"
            height="450px"
            poster="${this.media.poster}"
            class="photographer-media__picture">
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

    createTemplateLightBox(src, name) {
        const containerLightBox = document.querySelector('#galerie');
        let templateLightBox = `
        <div class="modal-galerie" aria-labelledby="image closeup view" role="dialog">
            <header role="header">
                <button class="modal-galerie__cross" role="button">
                <i class="fas fa-times" alt="Close dialog" role="button" onclick="close()" class="close-lightbox-icon"></i>
                </button>
            </header>
            <main>
                <section class="arrows__container" role="navigation">
                    <a href="javascript:void(0);" class="left-arrow-lightbox" alt="Previous image" role="link">
                        <i class="fas fa-angle-left"></i>
                    </a>
                </section>
                <section class="modal-galerie__image">
                </section>
                <section class="arrows__container" role="navigation">
                    <a href="javascript:void(0);" class="right-arrow-lightbox" alt="Previous image" role="link">
                        <i class="fas fa-angle-right"></i>
                    </a>
                </section>
                <div class="mediaSection">
                    <img src="${src}" alt="${name}">
                </div>
            </main>
            <p id="lightbox__name">${name}</p>
      </div>
        `

        containerLightBox.innerHTML = templateLightBox;
        return containerLightBox
    }
}