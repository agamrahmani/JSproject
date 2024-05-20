export class Image {
    constructor() {
        this.imagesArray = [];
    }

    // הוספת תמונה למערך
    addImage(src) {
        let img = new Image();
        img.src = src;
        this.imagesArray.push(img);
    }

    // קבלת כל התמונות במערך
    getAllImages() {
        return this.imagesArray;
    }

    // קבלת תמונה לפי אינדקס
    getImage(index) {
        if (index >= 0 && index < this.imagesArray.length) {
            return this.imagesArray[index];
        }
        else {
            return null;
        }
    }

}
