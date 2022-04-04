class Api {
    /**
     * 
     * @param {string} url
     */
    constructor(url) {
        this.url = url
    }

    async get () {
        return fetch(this.url)
            .then(res => res.json())
            .then(res => res.photographers)
            .catch(err => console.log('erreur rencontrée', err))
    }

    async getMedias () {
        return fetch(this.url)
            .then(res => res.json())
            .then(res => res.media)
            .catch(err => console.log('erreur rencontrée', err))
    }
}

class PhotographersApi extends Api {
    /*
    *
    * @param {string} url
    */
    constructor(url) {
        super(url)
    }

    async getPhotographers() {
        return await this.get()
    }
}

class MediaApi extends Api {
      /*
    *
    * @param {string} url
    */
      constructor(url) {
        super(url)
    }

    async getMedia() {
        return await this.getMedias()
    }
}