import { persistentMountPath } from "../config";
import { PersistentDatabase } from ".";
export class DiskDatabase implements PersistentDatabase {
  async save(identifier: string, object: any) {
    await Bun.write(
      `${persistentMountPath}/${identifier}`,
      JSON.stringify(object),
    );
  }
  read(identifier: string): Promise<any> {
    return Bun.file(`${persistentMountPath}/${identifier}`).json();
  }
  async connect() {}
  async close() {}
}
