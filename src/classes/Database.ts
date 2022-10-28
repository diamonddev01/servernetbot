import * as __db from 'quick.db';
import { DEFAULT_PREFIX } from '../config'
import { addGuildToNetworkIn, isOnNetworkIn, isOnNetworkOut } from '../types/Database';

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

    addToNetwork(data: addGuildToNetworkIn): boolean {
        const data_1 = this.getChannels()
        data_1.push(data.channel.id);
        this.set('channels', data_1);
        this.set(`channels/${data.channel.id}`, {
            id: data.channel.id,
            name: data.channel.name,
            messages: 0,
            guild_id: data.channel.guildId
        });
        const data_2 = (this.get('guilds/all') as string[] || []);
        data_2.push(data.guild.id);
        this.set('guilds/all', data_2);
        this.set(`guilds/${data.guild.id}`, {
            id: data.guild.id,
            name: data.guild.name,
            messages: 0,
            warnings: [],
            addedBy: data.addedBy.id,
            channel: data.channel.id
        });

        return true;
    }

    isOnNetwork(data: isOnNetworkIn): isOnNetworkOut {
        return {
            guild: data.guildId ? this.isGuildOnNetwork(data.guildId) : false,
            channel: data.channelId ? this.getChannels().includes(data.channelId) : false
        }
    }

    getChannels(): string[] {
        return this.get('channels') as string[] || [];
    }

    isGuildOnNetwork(guild: string): boolean {
        const guilds = this.get('guilds') as string[] || [];
        return guilds.includes(guild);
    }

    isUserStaff(id: string): boolean {
        const user = this.get(`users/${id}`) || { staff: false };

        return user.staff ? true : false; // Fixes undefined errors
    }
}