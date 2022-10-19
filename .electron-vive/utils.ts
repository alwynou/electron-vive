import { join } from "path";
import { fileURLToPath, URL } from "url";

export const ROOT_DIR = fileURLToPath(new URL('../', import.meta.url))
export const PACKAGES_DIR = join(ROOT_DIR, './packages')
