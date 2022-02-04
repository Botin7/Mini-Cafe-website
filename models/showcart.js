const carts = [];

class cart {

    constructor(title, price, imageURL, description, category) {
        this.title = title;
        this.price = new Number(price);
        this.imageURL = imageURL;
        this.description = description;
        this.category = category;
    }

    // save() {
    //     products.push(this);
    // 

}

module.exports = cart;