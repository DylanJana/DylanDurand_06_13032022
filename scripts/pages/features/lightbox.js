/**
 * @property {HTMLElement} element
 * @property {string[]} gallery
 */
 export class Lightbox {
    static init() {
      const photos = Array.from(document.querySelectorAll(".media__photo"));
      const titlePicture = photos.map(photo => photo.getAttribute("alt"));
      const gallery = photos.map(photo => photo.getAttribute("src"));
      photos.forEach(photo => photo.addEventListener("click", e => {
        e.preventDefault();
        new Lightbox(e.currentTarget.getAttribute("src"), e.currentTarget.getAttribute("alt"), titlePicture, gallery);
      }));
      photos.forEach(photo => photo.addEventListener("keypress", e => {
        if(e.key === "Enter"){
          e.preventDefault();
          new Lightbox(e.currentTarget.getAttribute("src"),  e.currentTarget.getAttribute("alt"), titlePicture, gallery);
        }
      }));
    }
  
    /**
       * @param {string} src Source du media
       * @param {string[]} gallery Chemin des medias de la lightbox
       */
    constructor(src, alt, title, gallery) {
      this.count = 0;
      this.element = this.buildLightboxInDOM();
      this.addMediaInLightbox(src, alt);
      this.onKeyUp = this.onKeyUp.bind(this);
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.gallery = gallery;
      document.body.appendChild(this.element);
      document.addEventListener("keyup", this.onKeyUp);
    }
    /**
       * Construit la lightbox dans le DOM
       * @returns {HTMLElement}
       */
    buildLightboxInDOM() {
      const dom = document.createElement("div");
      dom.classList.add("lightbox");
      dom.setAttribute("aria-hidden", "false");
      dom.setAttribute("aria-modal", "true");
      dom.setAttribute("role", "dialog");
      dom.innerHTML = `<button class="lightbox__close">Fermer</button>
                      <button class="lightbox__next">Suivant</button>
                      <div class="lightbox__container"><div></div></div>
                      <button class="lightbox__prev">Précédent</button>`;
      dom.querySelector(".lightbox__close").addEventListener("click", this.closeLightbox.bind(this));
      dom.querySelector(".lightbox__next").addEventListener("click", this.nextMedia.bind(this));
      dom.querySelector(".lightbox__prev").addEventListener("click", this.prevMedia.bind(this));
      document.querySelector(".body-wrapper").style.display  = "none";
      return dom;
    }
    /**
       * Ajoute le media dans la lightbox
       * @param {string} src Source du media
       */
    addMediaInLightbox(src, alt){
      const container = this.element.querySelector(".lightbox__container div");
      container.innerHTML = "";
      this.src = src;
      this.alt = alt;
      const titleImage = document.createElement('h2');
      titleImage.innerHTML = `${alt}`;
      if(src.includes(".jpg") || src.includes(".jpeg") || src.includes(".png")){
        const image = new Image();
        container.appendChild(image);
        image.classList.add("lightbox__photo");
        image.src = src;
      } else {
        container.innerHTML = `<video width="100" heigth="100" controls src="${src}" alt="${alt}" type="video/mp4" class="lightbox__video">Sorry, your browser doesn't support embedded videos.</video>`;
      }
      container.appendChild(titleImage);
    }
    /**
       *
       * @param {KeyboardEvent} e
       */
    onKeyUp(e) {
      switch(e.key){
        case "Escape" : this.closeLightbox(e);
        break;
        case "ArrowRight" : this.nextMedia(e);
        break;
        case "ArrowLeft": this.prevMedia(e);
      }
    }
    /**
       * Ferme la lightbox
       * @param {MouseEvent} e
       */
    closeLightbox(e) {
      e.preventDefault();
      document.querySelector(".body-wrapper").style.display  = "block";
      this.element.setAttribute("aria-hidden", "true");
      this.element.setAttribute("aria-modal", "false");
      this.element.remove();
      document.removeEventListener("keyup", this.onKeyUp);
    }
    /**
       * Aller au media suivant
       * @param {MouseEvent/KeyboardEvent} e
       */
    nextMedia(e) {
      e.preventDefault();
      let pos = this.gallery.findIndex(media => media === this.src);
      if(pos >= this.gallery.length-1){
          pos = 0;
      } else{
          pos++;
      }
      this.addMediaInLightbox(this.gallery[pos], this.title[pos]);
    }
      /**
       * Aller au media précédent
       * @param {MouseEvent/KeyboardEvent} e
       */
    prevMedia(e){
      e.preventDefault();
      let pos = this.gallery.findIndex(media => media === this.src);
      if(pos === 0){
          pos = this.gallery.length-1;
      } else{
          pos--;
      }
      this.addMediaInLightbox(this.gallery[pos], this.title[pos]);
  
    }
  }