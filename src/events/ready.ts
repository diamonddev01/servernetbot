import { Client } from "../classes/Client";
import { USER_STATUS } from "../config";

export async function event(client: Client): Promise<void> {
    // Submit all the slash command data
    const worked = await client.registerSlash();

    statusUpdater(client);
}

function statusUpdater(client: Client): void {
    let n = 0;

    updateStatus(client, n);

    setInterval(() => {
        n++;
        if (n == USER_STATUS.length) n = 0;
        updateStatus(client, n);
    }, 10000)
}

function updateStatus(client: Client, n: number): void {
    client.user?.setActivity({ name: USER_STATUS[n].text, type: USER_STATUS[n].type });
}