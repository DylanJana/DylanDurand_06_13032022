import { appMedia } from "../pages/photographer.js";
import MediaTemplate from "../templates/media-template.js";
function trapFocusFormLightBox() {
    // J'ajoute tous les éléments qui peuvent avoir un focus dans la variable focusableElements
    const  focusableElements = 'section, div, header, i, img, a, p#lightbox__name, [tabindex]:not([tabindex="-1"])';
    console.log("Focusable elements ", focusableElements)
    const modal = document.querySelector('#galerie'); // Je selectionne mon formulaire par son ID
    const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // Je récupère le premier element focusable
    console.log('First focus ', firstFocusableElement)
    const focusableContent = modal.querySelectorAll(focusableElements);
    console.log('FocusableContent ', focusableContent)
    const lastFocusableElement = focusableContent[focusableContent.length - 1]; // Je récupère le dernier element focusable
    console.log("Last Focus ", lastFocusableElement)

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
    console.log("Fonction lancée")
  });

  firstFocusableElement.focus(); // J'ajoute le focus sur le premier élément de la liste
}

class LightBox {
    constructor() {
        this.currentIndex = 0;
    }

    // initialize the lightbox when clicking on a media, call the functions allowing to navigate in the lightbox
    init(currentMedia) {
        let getMedias = Array.from(document.querySelectorAll('.photograph-medias article .photographer__media a'));
        getMedias.forEach((mediaWorks, index) => mediaWorks.addEventListener("click", () => {

            this.currentIndex = 0;
            console.log("Current index ", this.currentIndex)
            const Template = new MediaTemplate(mediaWorks)
            Template.createTemplateLightBox()
            document.getElementById('galerie').style.display = 'block';
            document.querySelector('#galerie').focus()
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
            let main = document.getElementById('main');
            main.setAttribute('style', 'pointer-events: none');
            document.querySelector('#galerie .modal-galerie')
           // this.previous(previousArrow, currentMedia);
           // this.next(nextArrow, currentMedia);
            
            this.close();
            trapFocusFormLightBox();
            return this
        }))
        this.keyboard(currentMedia);
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
            console.log("Current index next ", this.currentIndex)
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
            let main = document.getElementById('main');
            main.removeAttribute('style');

            lightbox.style.display = 'none';
        })
    }

    keyboard(media) {
        //trapFocusFormLightBox();
        console.log('keyboard');
        console.log("Current index clavier ", this.currentIndex)
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

                //let index = this.currentIndex;
                //console.log("Index right ", index)
                //console.log("Appuie droite ", index)

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

                let index = this.currentIndex;
                console.log("Appuie gauche ", index)

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