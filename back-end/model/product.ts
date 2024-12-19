import { Product as ProductPrisma } from '@prisma/client';

export class Product {
    private id?: number;
    private name: string;
    private price: number;
    private image: string;
    private description: string;

    constructor({
        id,
        name,
        price,
        image,
        description,
    }: {
        id?: number;
        name: string;
        price: number;
        image: string;
        description: string;
    }) {
        if (!name) {
            throw new Error('Name is required');
        }
        if (isNaN(price)) {
            throw new Error('Price is required');
        }
        if (!image) {
            throw new Error('Image is required');
        }
        if (!description) {
            throw new Error('Description is required');
        }

        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.description = description;
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
