/* Je récupére l'ID du photograph */
const id = window.location.search.split('id=')[1];
let totalLikes = parseInt(0)
let mediaLove = parseInt(0)


class App {
    constructor() {
        this.photographHeader = document.querySelector('.photograph-header')
        this.photographersApi = new PhotographersApi('/data/photographers.json')
    }

    async photograph() {
        const photographers = await this.photographersApi.getPhotographers()
        photographers
            .map(photographer => new Photograph(photographer) )
            .forEach(photographer => {
                if(photographer.id == id) {
                    const Template = new  PhotographTemplate(photographer)
                    this.photographHeader.appendChild(Template.createTemplatePhotograph())
                    let photographPrice = photographer.price
                    document.querySelector('.photograph-medias__counter div p#price-photograph').innerHTML = photographPrice + ' € / jour'
                }
            });
    }
}

class AppMedia {
    constructor() {
        this.photographMedias = document.querySelector('.photograph-medias') 
        this.mediasApi = new MediaApi('/data/photographers.json')
        this.countLikes = document.querySelector('.photograph-medias__counter p#total-likes span.love-count')
        this.mediasLoves = document.querySelector('p.d--inline-block')
    }

    async media() {
        const medias = await this.mediasApi.getMedia()
        let favoritesMedias = []
        medias
            .map(media => new Media(media) )
            .forEach(media => {
                if(media._photographerId == id) {
                    const Template = new MediaTemplate(media)
                    this.photographMedias.appendChild(Template.createTemplateMedia())
                    totalLikes +=  media.likes
                    this.countLikes.innerHTML = totalLikes + ' <i class="fas fa-heart black" aria-label="likes"></i>'
                    mediaLove = media.likes
                    const addMedia = favoritesMedias.push(mediaLove)
                }
            });
            console.log(favoritesMedias)

            let favoritesButtons = document.getElementsByClassName('love-btn')
            let picturesLoves = document.getElementsByClassName('d--inline-block')
            let result = this.countLikes
            for (let i = 0; i < favoritesButtons.length; i++) {
                let favoriteButton = favoritesButtons[i]
                let favoriteMedia = favoritesMedias[i]
                let pictureLove = picturesLoves[i]
                favoriteButton.addEventListener('click', function() {
                    if(pictureLove.classList.contains('one')) {
                        pictureLove.classList.remove('one')
                        favoriteMedia--
                        totalLikes--
                        pictureLove.innerHTML = favoriteMedia
                    } else {
                        pictureLove.classList.add('one')
                        picturesLoves = document.querySelector('.d--inline-block.one')
                        favoriteMedia++
                        totalLikes++
                        pictureLove.innerHTML = favoriteMedia
                    }
                    result.innerHTML = totalLikes + ' <i class="fas fa-heart black" aria-label="likes"></i>'
                })
            }
    }

}

let app = new App()
app.photograph()

const appMedia = new AppMedia()
appMedia.media()