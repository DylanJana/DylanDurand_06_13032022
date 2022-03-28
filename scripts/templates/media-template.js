class MediaTemplate {
    constructor(media) {
        this.media = media
    }

    createTemplateMedia() {
        const mediaContainer = document.createElement('article');
        mediaContainer.setAttribute('aria-label', 'media');
        let mediaPhotograph =
        `
        <!-- Je crée mon template pour un media-->
        <div>
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
        if (this.media._video !== undefined) {
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
                <p class="d--inline-block"><span class="love-count">${this.media.likes}</span></p>
                <a href="javascript:void(0);" class="love-btn" role="link"><i class="fas fa-heart color-primary" aria-label="likes"></i></a>
            </div>
        </div>
        `
        }

        mediaContainer.innerHTML = mediaPhotograph
        return mediaContainer
    }
}