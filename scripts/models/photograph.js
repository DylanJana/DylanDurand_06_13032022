class Photograph {
    constructor(photographer) {
        this.name = photographer.name
        this.location = photographer.city + ", " + photographer.country
        this.tagline = photographer.tagline
        this.portrait = photographer.portrait
        this.price = photographer.price
        this.id = photographer.id
    }
}