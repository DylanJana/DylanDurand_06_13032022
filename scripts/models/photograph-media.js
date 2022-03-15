class Media {
    constructor(media) {
        this._id = media.id
        this._photographerId = media.photographerId
        this._title =  media.title
        this._image =  media.image
        this._video = media.video
        this._poster = media.poster
        this._likes =  media.likes
        this._date =  media.date
        this._price = media.price
    }

    get id() {
        return this._id
    }

    get photographer() {
        return this._photographerId
    }

    get title() {
        return this._title
    }

    get image() {
        return `/assets/images/${this._image}`
    }

    get video() {
        return `/assets/images/${this._video}`
    }

    get poster() {
        return `/assets/images/${this._poster}`
    }

    get likes() {
        return this._likes
    }

    get price() {
        return this._price;
    }

    get photographerPrice() {
        return this._photographerPrice
    }
}