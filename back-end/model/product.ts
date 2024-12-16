import { Product as ProductPrisma } from '@prisma/client';

export class Product {
    private id?: number;
    private name: string;
    private price: number;
    private image: string;
    private description: string;

    constructor(product: {
        id?: number;
        name: string;
        price: number;
        image: string;
        description: string;
    }) {
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.image = product.image;
        this.description = product.description;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }

    getImage(): string {
        return this.image;
    }

    getDescription(): string {
        return this.description;
    }

    equals(product: Product): boolean {
        return (
            this.id === product.getId() &&
            this.name === product.getName() &&
            this.price === product.getPrice() &&
            this.image === product.getImage() &&
            this.description === product.getDescription()
        );
    }

    static from({ id, name, price, image, description }: ProductPrisma) {
        return new Product({
            id,
            name,
            price,
            image,
            description,
        });
    }
}
