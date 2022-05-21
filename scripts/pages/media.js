export class MediaFactory {
    constructor() {
        this.createMedia = function (data, name) {
            let media;
            if (data.image != undefined) {
                media = new ImageFactory(data, name);
            } else if (data.video != undefined) {
                media = new VideoFactory(data, name);
            } else {
                console.log("error");
            }
            return media;
        }
    }
}

class Media {
    constructor(data) {
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.tags = data.tags;
        this.likes = data.likes;
        this.date = data.date;
        this.price = data.price;
    }
}

class ImageFactory extends Media {
    constructor(data, name) {
        super(data);
        this.image = data.image;
        this.alt = data.alt;
        let folderName = name.split(" ");
        if(folderName[0].includes("-")){
            folderName[0] = folderName[0].replace("-", " ");
        }
        this.mediaHTML = `<img class="media__photo" tabIndex="0" alt="${this.alt}" src="../assets/images/${folderName[0]}/${this.image}"/>`
    }
}

class VideoFactory extends Media {
    constructor(data, name) {
        super(data);
        this.video = data.video;
        let folderName = name.split(" ");
        if(folderName[0].includes("-")){
            folderName[0] = folderName[0].replace("-", " ");
        }
        this.mediaHTML = ` <video width="350" heigth="400" class="media__photo" tabIndex="0" src="../assets/images/${folderName[0]}/${this.video}#t=0.1" poster="../assets/images/${folderName[0]}/${this.poster}" type="video/mp4" >Sorry, your browser doesn't support embedded videos.</video>`
    }
}
