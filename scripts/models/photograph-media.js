class Media  {
    constructor(media) {
        this._id = media.id
        this.photographerId = media.photographerId
        this.title =  media.title
        this.image =  media.image
        this.video = media.video
        this.poster = media.poster
        this.likes =  media.likes
        this.date =  media.date
        this.price = media.price
    }

    /*get id() {
        return this._id
    }

    get photographer() {
        return this.photographerId
    }

    /*get title() {
        return this.title
    }

    get image() {
        return `/assets/images/${this.image}`
    }

    get video() {
        return `/assets/images/${this.video}`
    }

    get poster() {
        return `/assets/images/${this.poster}`
    }

    get likes() {
        return this.likes
    }

    get price() {
        return this._price;
    }

    get photographerPrice() {
        return this._photographerPrice
    }*/
}