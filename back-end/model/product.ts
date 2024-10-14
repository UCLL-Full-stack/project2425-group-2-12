export class Product {
    // private variable instances
    private id?: number; // id is optional (?)
    private product_name: string;
    private description: string;
    private price: number;

    // constructor
    constructor(product: {
        id?: number;
        product_name: string;
        description: string;
        price: number;
    }) {
        this.id = product.id;
        this.product_name = product.product_name;
        this.description = product.description;
        this.price = product.price;
    }

    // getters
    getId(): number | undefined {
        return this.id;
    } 

    getProductName(): string {
        return this.product_name;
    }

    getDescription(): string {
        return this.description;
    }

    getPrice(): number {
        return this.price;
    }
}
