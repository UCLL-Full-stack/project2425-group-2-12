import { Profile } from './profile';

export class User {
    // private variable instances
    private id?: number; // id is optional (?)
    private username: string;
    private password: string;
    private profile: Profile;

    // constructor
    constructor(user: { id?: number; username: string; password: string; profile: Profile }) {
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.profile = user.profile;
    }

    // getters
    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getPassword(): string {
        return this.password;
    }

    getProfile(): Profile {
        return this.profile;
    }
}
