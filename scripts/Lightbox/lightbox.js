import MediaTemplate from "../templates/media-template.js";
class LightBox {
    constructor() {
        this.currentIndex = 0;
    }

    // initialize the lightbox when clicking on a media, call the functions allowing to navigate in the lightbox
    init(currentMedia) {
        let getMedias = Array.from(document.querySelectorAll('.photograph-medias article .photographer__media .photographer-media__picture'));
        getMedias.forEach((mediaWorks, index) => mediaWorks.addEventListener("click", () => {
            const Template = new MediaTemplate(mediaWorks)
            Template.createTemplateLightBox()
            document.getElementById('galerie').style.display = 'block';
            let lightBoxMedia = document.querySelector('.modal-galerie__image');
            let lightBoxName = document.querySelector('.modal-galerie #lightbox__name');
            this.currentIndex = index;
            let src = `/assets/images/${currentMedia[index].image}`;
            let nameSrc = currentMedia[index].title;
            lightBoxMedia.innerHTML = `<img src="${src}" alt="${nameSrc}">`;
            let videoPlayer = currentMedia[index].hasOwnProperty('video');
            let videoMedia = currentMedia[index].video;
            if(videoPlayer == true && videoMedia !== undefined) {
                lightBoxMedia.innerHTML = `<video width="80%" height="450px" controls><source src="/assets/images/${currentMedia[index].video}" type="video/mp4" alt="${nameSrc}"></video>`;
            }
            lightBoxName.innerHTML = `${nameSrc}`;
            let previousArrow = document.querySelector('a.left-arrow-lightbox');
            let nextArrow = document.querySelector('a.right-arrow-lightbox');
            this.previous(previousArrow, currentMedia);
            this.next(nextArrow, currentMedia);
            this.close();
            this.keyboard(currentMedia);
            return this
        }))
    }

    // return to previous media
    previous(elt, media) {
        elt.addEventListener("click", () => {
            this.currentIndex -= 1;
            let lightBoxMedia = document.querySelector('.modal-galerie__image');
            let lightBoxName = document.querySelector('.modal-galerie #lightbox__name');

            if (this.currentIndex < 0) {
                this.currentIndex = media.length - 1;
            }

            let index = this.currentIndex

            let src = `/assets/images/${media[index].image}`;
            let nameSrc = media[index].title;
    
            lightBoxMedia.innerHTML = `<img src="${src}" alt="${nameSrc}">`;
            let videoPlayer = media[index].hasOwnProperty('video');
            let videoMedia = media[index].video;
            if(videoPlayer == true && videoMedia !== undefined) {
                lightBoxMedia.innerHTML = `<video width="80%" height="450px" controls><source src="/assets/images/${media[index].video}" type="video/mp4" alt="${nameSrc}"></video>`;
            }
            lightBoxName.innerHTML = `${nameSrc}`;
        })
    }

    // turn to the next media
    next(elt, media) {
        elt.addEventListener('click', () => {
            this.currentIndex += 1;
            let lightBoxMedia = document.querySelector('.modal-galerie__image');
            let lightBoxName = document.querySelector('.modal-galerie #lightbox__name');

            if (this.currentIndex > media.length - 1) {
                this.currentIndex = 0;
            }

            let index = this.currentIndex;

            let src = `/assets/images/${media[index].image}`;
            let nameSrc = media[index].title;
    
            lightBoxMedia.innerHTML = `<img src="${src}" alt="${nameSrc}">`;
            let videoPlayer = media[index].hasOwnProperty('video');
            let videoMedia = media[index].video;
            if(videoPlayer == true && videoMedia !== undefined) {
                lightBoxMedia.innerHTML = `<video width="80%" height="450px" controls><source src="/assets/images/${media[index].video}" type="video/mp4" alt="${nameSrc}"></video>`;
            }
            lightBoxName.innerHTML = `${nameSrc}`;
        })
    }

    close() {
        document.querySelector('a.modal-galerie__cross').addEventListener('click', () => {
            let lightbox = document.getElementById('galerie');

            lightbox.style.display = 'none';
        })
    }

    keyboard(media) {
        document.addEventListener('keydown', (key) => {
            let lightBoxMedia = document.querySelector('.modal-galerie__image');
            let lightBoxName = document.querySelector('.modal-galerie #lightbox__name');

            // ESCAPE TO CLOSE
            if (key.code == "Escape") {
                let lightBox = document.getElementById('galerie');
                lightBox.style.display = 'none';
            }

            // ARROW RIGHT TO STEP RIGHT
            else if (key.code == "ArrowRight") {
                this.currentIndex += 1;

                if (this.currentIndex > media.length - 1) {
                    this.currentIndex = 0;
                }

                let index = this.currentIndex;

                let src = `/assets/images/${media[index].image}`;
                let nameSrc = media[index].title;
        
                lightBoxMedia.innerHTML = `<img src="${src}" alt="${nameSrc}">`;
                let videoPlayer = media[index].hasOwnProperty('video');
                let videoMedia = media[index].video;
                if(videoPlayer == true && videoMedia !== undefined) {
                    lightBoxMedia.innerHTML = `<video width="80%" height="450px" controls><source src="/assets/images/${media[index].video}" type="video/mp4" alt="${nameSrc}"></video>`;
                }
                lightBoxName.innerHTML = `${nameSrc}`;
            }

            // ARROW LEFT TO STEP LEFT
            else if (key.code == "ArrowLeft") {
                this.currentIndex -= 1;

                if (this.currentIndex < 0) {
                    this.currentIndex = media.length - 1;
                }

                let index = this.currentIndex;

                let src = `/assets/images/${media[index].image}`;
                let nameSrc = media[index].title;
        
                lightBoxMedia.innerHTML = `<img src="${src}" alt="${nameSrc}">`;
                let videoPlayer = media[index].hasOwnProperty('video');
                let videoMedia = media[index].video;
                if(videoPlayer == true && videoMedia !== undefined) {
                    lightBoxMedia.innerHTML = `<video width="80%" height="450px" controls><source src="/assets/images/${media[index].video}" type="video/mp4" alt="${nameSrc}"></video>`;
                }
                lightBoxName.innerHTML = `${nameSrc}`;
            }
        });
    }
}

export const lightBox = new LightBox();