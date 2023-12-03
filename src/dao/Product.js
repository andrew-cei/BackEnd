// Productos
export default class Product{
    constructor(title, description, category ,price, thumbnails, code, stock, status){
        this.title = title;
        this.description = description;
        this.category = category;
        this.price = price;
        this.thumbnails = thumbnails;
        this.code = code;
        this.status = status;
        this.stock= stock;
    }
}