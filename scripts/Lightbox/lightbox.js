import MediaTemplate from "../templates/media-template.js";
class LightBox {
    constructor() {
        this.currentIndex = 0;
    }

    // initialize the lightbox when clicking on a media, call the functions allowing to navigate in the lightbox
    init(currentMedia, currentMediaName) {
        let getMedias = Array.from(document.querySelectorAll('.photograph-medias article .photographer__media .photographer-media__picture'));
        console.log("currentMedia ",currentMedia)
        console.log("currentMediaName", currentMediaName)
        getMedias.forEach((mediaWorks, index) => mediaWorks.addEventListener("click", () => {
            console.log("getMedias", getMedias)
            document.getElementById('galerie').style.display = 'block';
            let lightBoxMedia = document.querySelector('.modal-galerie__image #lightbox__media');
            let lightBoxName = document.querySelector('.modal-galerie #lightbox__name');
            console.log("Name ", lightBoxName)
            console.log("media works ", mediaWorks)
            console.log("media index ", index);
            this.currentIndex = index;
            let src = currentMedia;
            console.log("src ", src)
            let nameSrc = currentMediaName;
            console.log("nameSrc ", nameSrc)
    
            lightBoxMedia.innerHTML = `${src}`;
            console.log('lightBoxMedia ', lightBoxMedia)
            lightBoxName.innerHTML = `${nameSrc}`;
            console.log("Last index ", this.currentIndex)
        }))

        
        this.previous(document.querySelector('a.left-arrow-lightbox'), currentMedia, currentMediaName);
        this.next(document.querySelector('a.right-arrow-lightbox'), currentMedia, currentMediaName);
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
        document.querySelector('a.modal-galerie__cross').addEventListener('click', () => {
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

export const lightBox = new LightBox();