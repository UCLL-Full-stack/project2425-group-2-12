export class Product {
    // private variable instances
    private id?: number; // id is optional (?)
    private productname: string;
    private description: string;
    private price: number;

    // constructor
    constructor(product: { id?: number; productname: string; description: string; price: number }) {
        this.id = product.id;
        this.productname = product.productname;
        this.description = product.description;
        this.price = product.price;
    }

    // getters
    getId(): number | undefined {
        return this.id;
    }

    getProductName(): string {
        return this.productname;
    }

    getDescription(): string {
        return this.description;
    }

    getPrice(): number {
        return this.price;
    }
}
