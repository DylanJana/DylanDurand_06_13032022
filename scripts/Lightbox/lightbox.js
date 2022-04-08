export default class LightBox {
    constructor() {
        this.currentIndex = 0;
    }

    // initialize the lightbox when clicking on a media, call the functions allowing to navigate in the lightbox
    init(currentMedia, currentMediaName) {
        let getMedias = Array.from(document.getElementsByClassName('photographer__media'));
        getMedias.forEach((mediaWorks, index) => mediaWorks.addEventListener("click", () => {
            let lightBoxMedia = document.getElementById('lightbox__media');
            let lightBoxName = document.getElementById('lightbox__name');
            let src = currentMedia[index];
            let nameSrc = currentMediaName[index];
            this.currentIndex = index;

            document.getElementById('galerie').style.display = 'block';
            lightBoxMedia.innerHTML = `${src}`;
            lightBoxName.innerHTML = `${nameSrc}`;
        }))
        this.previous(document.querySelector('.left-arrow-lightbox'), currentMedia, currentMediaName);
        this.next(document.querySelector('.right-arrow-lightbox'), currentMedia, currentMediaName);
        this.close();
        this.keyboard(currentMedia, currentMediaName);
        return this
    }

    // return to previous media
    previous(elt, media, name) {
        elt.addEventListener('click', () => {
            this.currentIndex -= 1;
            let lightBoxMedia = document.getElementById('lightbox__media');
            let lightBoxName = document.getElementById('lightbox__name');

            if (this.currentIndex < 0) {
                this.currentIndex = media.length - 1;
                this.currentIndex = name.length - 1;
            }

            let src = media[this.currentIndex];
            let nameSrc = name[this.currentIndex];

            lightBoxMedia.innerHTML = `${src}`;
            lightBoxName.innerHTML = `${nameSrc}`;
        })
    }

    // turn to the next media
    next(elt, media, name) {
        elt.addEventListener('click', () => {
            this.currentIndex += 1;
            let lightBoxMedia = document.getElementById('lightbox__media');
            let lightBoxName = document.getElementById('lightbox__name');

            if (this.currentIndex > name.length - 1) {
                this.currentIndex = 0;
            }

            let src = media[this.currentIndex];
            let nameSrc = name[this.currentIndex];

            lightBoxMedia.innerHTML = `${src}`;
            lightBoxName.innerHTML = `${nameSrc}`;
        })
    }

    close() {
        document.querySelector('.close-lightbox-icon').addEventListener('click', () => {
            let lightbox = document.getElementById('galerie');

            lightbox.style.display = 'none';
        })
    }

    keyboard(currentMedia, currentMediaName) {
        document.addEventListener('keydown', (key) => {
            let lightBoxMedia = document.getElementById('lightbox__media');
            let lightBoxName = document.getElementById('lightbox__name');

            // ESCAPE TO CLOSE
            if (key.code == "Escape") {
                let lightBox = document.getElementById('galerie');
                lightBox.style.display = 'none';
            }

            // ARROW RIGHT TO STEP RIGHT
            else if (key.code == "ArrowRight") {
                this.currentIndex += 1;

                if (this.currentIndex > currentMediaName.length - 1) {
                    this.currentIndex = 0;
                }

                let src = currentMedia[this.currentIndex];
                let nameSrc = currentMediaName[this.currentIndex];

                lightBoxMedia.innerHTML = `${src}`;
                lightBoxName.innerHTML = `${nameSrc}`;
            }

            // ARROW LEFT TO STEP LEFT
            else if (key.code == "ArrowLeft") {
                this.currentIndex -= 1;

                if (this.currentIndex < 0) {
                    this.currentIndex = currentMedia.length - 1;
                    this.currentIndex = currentMediaName.length - 1;
                }

                let src = currentMedia[this.currentIndex];
                let nameSrc = currentMediaName[this.currentIndex];

                lightBoxMedia.innerHTML = `${src}`;
                lightBoxName.innerHTML = `${nameSrc}`;
            }
        });
    }
}