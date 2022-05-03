import { appMedia } from "../pages/photographer.js";
import MediaTemplate from "../templates/media-template.js";
function trapFocusFormLightBox() {
    // J'ajoute tous les éléments qui peuvent avoir un focus dans la variable focusableElements
    const modal = document.querySelector('#galerie'); // Je selectionne mon formulaire par son ID
    const  focusableElements = 'button, header, section, video, img, a';
    const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // Je récupère le premier element focusable
    const focusableContent = modal.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1]; // Je récupère le dernier element focusable

    document.addEventListener('keydown', function(e) {
    let isTabPressed = e.key === 'Tab' || e.code === 9;

    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) { // Si la touche shift est préssée lors d'une combination shift + tabulation
      if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus(); // Je met le focus sur le dernier élément de ma liste des éléments focusables (focusablesElements)
      e.preventDefault();
      }
    } else { // Sinon si la touche Tab est pressée
      if (document.activeElement === lastFocusableElement) { //Si je me trouve sur le dernier élément focusable de la liste
      firstFocusableElement.focus(); // Alors j'ajoute le focus sur le premier élément de la liste
      e.preventDefault();
      }
    }
  });
  document.querySelector('#galerie button').focus();
}

class LightBox {
    constructor() {
        this.currentIndex = 0;
        this.bool = 0; 
    }

    // initialize the lightbox when clicking on a media, call the functions allowing to navigate in the lightbox
    init(currentMedia) {
        console.log("Current media ", currentMedia)
        this.bool++;
        console.log(this.bool)
        let getMedias = Array.from(document.querySelectorAll('.photograph-medias article .photographer__media a'));
        getMedias.forEach((mediaWorks) => mediaWorks.addEventListener("click", () => {

            this.currentIndex = 0;
            const Template = new MediaTemplate(mediaWorks)
            Template.createTemplateLightBox()
            document.getElementById('galerie').style.display = 'block';
            trapFocusFormLightBox();
            let lightBoxMedia = document.querySelector('.modal-galerie__image');
            let lightBoxName = document.querySelector('.modal-galerie #lightbox__name');
            let src = `/assets/images/${currentMedia[this.currentIndex].image}`;
            let nameSrc = currentMedia[this.currentIndex].title;
            lightBoxMedia.innerHTML = `<img src="${src}" alt="${nameSrc}">`;
            let videoPlayer = currentMedia[this.currentIndex].hasOwnProperty('video');
            let videoMedia = currentMedia[this.currentIndex].video;
            if(videoPlayer == true && videoMedia !== undefined) {
                lightBoxMedia.innerHTML = `<video width="80%" height="450px" controls><source src="/assets/images/${currentMedia[this.currentIndex].video}" type="video/mp4" alt="${nameSrc}"></video>`;
            }
            lightBoxName.innerHTML = `${nameSrc}`;
            let previousArrow = document.querySelector('a.left-arrow-lightbox');
            let nextArrow = document.querySelector('a.right-arrow-lightbox');
            let main = document.getElementById('main');
            main.setAttribute('style', 'pointer-events: none');
            document.querySelector('#galerie .modal-galerie')
            this.previous(previousArrow, currentMedia);
            this.next(nextArrow, currentMedia);
            this.close();
            return this
        }))
        if(this.bool === 1) {
            this.keyboard(currentMedia);
        }
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

            let src = `/assets/images/${media[this.currentIndex].image}`;
            let nameSrc = media[this.currentIndex].title;
    
            lightBoxMedia.innerHTML = `<img src="${src}" alt="${nameSrc}">`;
            let videoPlayer = media[this.currentIndex].hasOwnProperty('video');
            let videoMedia = media[this.currentIndex].video;
            if(videoPlayer == true && videoMedia !== undefined) {
                lightBoxMedia.innerHTML = `<video width="80%" height="450px" controls><source src="/assets/images/${media[this.currentIndex].video}" type="video/mp4" alt="${nameSrc}"></video>`;
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

            this.currentIndex;

            let src = `/assets/images/${media[this.currentIndex].image}`;
            let nameSrc = media[this.currentIndex].title;
    
            lightBoxMedia.innerHTML = `<img src="${src}" alt="${nameSrc}">`;
            let videoPlayer = media[this.currentIndex].hasOwnProperty('video');
            let videoMedia = media[this.currentIndex].video;
            if(videoPlayer == true && videoMedia !== undefined) {
                lightBoxMedia.innerHTML = `<video width="80%" height="450px" controls><source src="/assets/images/${media[this.currentIndex].video}" type="video/mp4" alt="${nameSrc}"></video>`;
            }
            lightBoxName.innerHTML = `${nameSrc}`;
        })
    }

    close() {
        document.querySelector('button.modal-galerie__cross').addEventListener('click', () => {
            let lightbox = document.getElementById('galerie');
            let main = document.getElementById('main');
            main.removeAttribute('style');

            lightbox.style.display = 'none';
        })
    }

    keyboard(media) {
        console.log("media ", media)
        document.addEventListener('keydown', (key) => {
            let lightBoxMedia = document.querySelector('.modal-galerie__image');
            let lightBoxName = document.querySelector('.modal-galerie #lightbox__name');
            console.log("Key ", key)

            // ESCAPE TO CLOSE
            if (key.code == "Escape") {
                let lightBox = document.getElementById('galerie');
                lightBox.style.display = 'none';
                main.removeAttribute('style');
            }

            // ARROW RIGHT TO STEP RIGHT
            else if (key.code == "ArrowRight") {
                console.log("Current index clavier suivant ", this.currentIndex)
                this.currentIndex += 1;

                if (this.currentIndex > media.length - 1) {
                    this.currentIndex = 0;
                }

                let src = `/assets/images/${media[this.currentIndex].image}`;
                let nameSrc = media[this.currentIndex].title;
        
                lightBoxMedia.innerHTML = `<img src="${src}" alt="${nameSrc}">`;
                let videoPlayer = media[this.currentIndex].hasOwnProperty('video');
                let videoMedia = media[this.currentIndex].video;
                if(videoPlayer == true && videoMedia !== undefined) {
                    lightBoxMedia.innerHTML = `<video width="80%" height="450px" controls><source src="/assets/images/${media[this.currentIndex].video}" type="video/mp4" alt="${nameSrc}"></video>`;
                }
                lightBoxName.innerHTML = `${nameSrc}`;
                
            }

            // ARROW LEFT TO STEP LEFT
            else if (key.code == "ArrowLeft") {
                this.currentIndex -= 1;

                if (this.currentIndex < 0) {
                    this.currentIndex = media.length - 1;
                }

                let src = `/assets/images/${media[this.currentIndex].image}`;
                let nameSrc = media[this.currentIndex].title;
        
                lightBoxMedia.innerHTML = `<img src="${src}" alt="${nameSrc}">`;
                let videoPlayer = media[this.currentIndex].hasOwnProperty('video');
                let videoMedia = media[this.currentIndex].video;
                if(videoPlayer == true && videoMedia !== undefined) {
                    lightBoxMedia.innerHTML = `<video width="80%" height="450px" controls><source src="/assets/images/${media[this.currentIndex].video}" type="video/mp4" alt="${nameSrc}"></video>`;
                }
                lightBoxName.innerHTML = `${nameSrc}`;
            }
        });
    }
}

export const lightBox = new LightBox();