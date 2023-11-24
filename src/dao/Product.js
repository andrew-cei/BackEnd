// Productos
export default class Product{
    constructor(Id, title, description, price, thumbnail, code, stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock= stock;
        this.id = Id;
    }
}