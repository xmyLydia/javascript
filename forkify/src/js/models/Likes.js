export default class Likes{
    constructor(){
        this.likes = [];
    }

    addLike(id, title, author, img){
        const like = {
            id,
            title,
            author,
            img
        };
        this.likes.push(like);
        //perist data in localStorage
        this.persistData();
        return like;
    }

    deleteLike(id){
        const index = this.likes.findIndex(el=> el.id ===id);
        this.likes.splice(index, 1);
        //perist data in localStorage
        this.persistData();
    }

    isLiked(id){
        const index = this.likes.findIndex(el=> el.id ===id);
        return index!==-1;
    }

    getNumLikes(){ 
        return this.likes.length;
    }

    persistData(){
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage(){
        const storage = JSON.parse(localStorage.getItem('likes'));
        //restore likes from the localStorage
        if(storage){
            this.likes = storage;
        }
    }
}