import { K8S_CLUSTER_URL } from "../../singletons/externalEndpoints"

class KeipClient {
    public serverBaseUrl = K8S_CLUSTER_URL

    ping(intervalMs: number, callback: (isAvailable: boolean) => void) {
        setInterval(async () => {
            try {
                const response = await fetch(`${this.serverBaseUrl}/status`);
                callback(response.ok);
            } catch (error) {
                callback(false);
            }
        }, intervalMs);
    }


    async put<T>(name: string, namespace: string): Promise<T> {
        const response = await fetch(`${this.serverBaseUrl}/route`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "name": name, "namespace": namespace }),
        });

        if (!response.ok) {
            throw new Error(`PUT request failed: ${response.status}`);
        }

        return response.json();
    }
}

export const keipClient = new KeipClient()