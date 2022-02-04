const products = [];

class Product {

    constructor(title, price, imageURL, description, category) {
        this.title = title;
        this.price = new Number(price);
        this.imageURL = imageURL;
        this.description = description;
        this.category = category;
    }

    // save() {
    //     products.push(this);
    // }

    static findAll() {
        return products;
    }

    static findById(prodId) {
        return products.filter(p => p.id == prodId);
    }

    update() {
        const editProductIndex = products.findIndex(p => p.id == this.id);
        products[editProductIndex] = this;
    }

    static deleteById(prodId) {
        const deleteProductIndex = products.findIndex(p => p.id == prodId);
        products.splice(deleteProductIndex, 1);
    }

}

module.exports = Product;