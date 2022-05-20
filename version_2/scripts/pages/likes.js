export class Likes{

    static init(){
        const likes = Array.from(document.querySelectorAll(".media__likes"));
        const total = likes.map(like => parseInt(like.innerText));
        new Likes(total)
    }

    constructor(total){
        this.total = total;
        this.displayTotalLikes();
        const hearts = Array.from(document.querySelectorAll(".media__heart"));
        for(let i = hearts.length-1; i>= 0; i--){
            hearts[i].addEventListener("click", e =>{
                e.preventDefault()
                this.incrementMediaLikes(i);
            })
            hearts[i].addEventListener("keypress", e =>{
                if (e.key ==="Enter") {
                    e.preventDefault()
                    this.incrementMediaLikes(i);
                } 
            })
        }
    }

    incrementMediaLikes(index){
        const likesNumber = document.querySelectorAll(".media__likes-number");
        const likesHeart = document.querySelectorAll(".media__heart");
        if(likesHeart[index].classList.contains("isLiked")){
            this.total[index]--;
            likesNumber[index].innerHTML = `${this.total[index]} `;
            likesHeart[index].classList.replace("fas", "far");
            likesHeart[index].classList.remove("isLiked");
        }else {
            this.total[index]++;
            likesNumber[index].innerHTML = `${this.total[index]} `;
            likesHeart[index].classList.replace("far", "fas");
            likesHeart[index].classList.add("isLiked");
        }
        this.displayTotalLikes()
    }

    displayTotalLikes(){
        let result = 0;
        result = this.total.reduce((a,b) => a+b);
        const dom = document.querySelector(".likes__total");
        dom.innerHTML = "";
        dom.innerHTML = `${result}`;
        
    }

}