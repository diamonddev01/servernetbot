// Exports a class that can interact with the database system.
import {QuickDB} from 'quick.db';
import { Client } from '../classes/Client';
import { User } from '../classes/User';
import { SavableUserData } from '../types/Database';

const filePath = "../database/database.sqlite"

// Comes with base get-set etc
export class Database extends QuickDB {
    private Client: Client;
    public Users: UserDatabase;

    constructor(client: Client) {
        super({
            filePath,
            table: "general"
        });
        this.Client = client;
        this.Users = new UserDatabase(this.Client);
    }
}

class UserDatabase extends QuickDB {
    private Client: Client;

    constructor(client: Client) {
        super({
            filePath,
            table: "users"
        });
        this.Client = client;
    }

    getUser(user_id: string): Promise<SavableUserData | null> {
        return this.get<SavableUserData>(user_id);
    }

    saveUser(user_id: string, userData: User) {};
}