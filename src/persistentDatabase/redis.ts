import { redisConnectionUrl } from "../config";
import { createClient } from "redis";
import { PersistentDatabase } from ".";
export class RedisDatabase implements PersistentDatabase {
  client = createClient({ url: redisConnectionUrl });
  async save(identifier: string, object: any) {
    await this.client.json.set(identifier, "$", object);
  }
  read(identifier: string): Promise<any> {
    return this.client.json.get(identifier);
  }
  async connect() {
    await this.client.connect();
    this.client.on("error", (err) => console.log("Redis Client Error", err));
  }
  async close() {
    await this.client.disconnect();
  }
}
