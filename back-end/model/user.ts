export class User {
    // private variable instances
    private id?: number; // id is optional (?)
    private username: string;
    private password: string;

    // constructor
    constructor(user: { id?: number; username: string; password: string }) {
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
    }

    // getters
    getId(): number | undefined {
        return this.id;
    }

    getLastName(): string {
        return this.username;
    }

    getFirstName(): string {
        return this.password;
    }
}
