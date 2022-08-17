const price = 20000;
const discount = 0.1;

class Testing {
    constructor(price, discount) {
        this.price = price;
        this.discount = discount;
    }

    get testing() {
        const desc = `my name is ${this.name}`;
        return desc;
    }

    get priceDiscount() {
        return this.price * this.discount;
    }

    get newPrice() {
        return this.price - this.priceDiscount;
    }
}

export default Testing;