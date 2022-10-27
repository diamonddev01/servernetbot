import * as __db from 'quick.db';
import { DEFAULT_PREFIX } from '../config'

export class db {
    direct_access: typeof __db = __db;

    // Functions
    get: typeof __db.get = __db.get;
    set: typeof __db.set = __db.set;
    add: typeof __db.add = __db.add;
    all: typeof __db.all = __db.all;
    delete: typeof __db.delete = __db.delete;
    fetch: typeof __db.fetch = __db.fetch;
    fetchAll: typeof __db.fetchAll = __db.fetchAll;
    has: typeof __db.has = __db.has;
    includes: typeof __db.includes = __db.includes;
    push: typeof __db.push = __db.push;
    subtract: typeof __db.subtract = __db.subtract;
    table: typeof __db.table = __db.table;
    type: typeof __db.type = __db.type;
    version: typeof __db.version = __db.version;

    constructor() {
    }

    get_guild_prefix(guild_id: string): string {
        const prefix = this.get(`guilds/${guild_id}/prefix`);
        return prefix ? prefix : DEFAULT_PREFIX;
    }
}