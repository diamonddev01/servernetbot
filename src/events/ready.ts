import { Client } from "../classes/Client";
import { UserStatuses } from "../config";

export async function event(client: Client): Promise<void> {
    const worked = await client.registerSlashCommands();

    statusUpdater(client);
}

function statusUpdater(client: Client): void {
    let n = 0;

    updateStatus(client, n);

    setInterval(() => {
        n++;
        if (n == UserStatuses.length) n = 0;
        updateStatus(client, n);
    }, 10000)
}

function updateStatus(client: Client, n: number): void {
    client.user?.setActivity({ name: UserStatuses[n].name, type: UserStatuses[n].type });
}