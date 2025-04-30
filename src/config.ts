import { MigrationConfig } from "drizzle-orm/migrator";
import { platform } from "os";

type Config = {
  api: APIConfig;
  db: DBConfig;
};

// configuration de l'API
type APIConfig = {
  fileserverHits: number;
  port: Number;
  platform: string;
};

type DBConfig = {
  url: string;
  migrationConfig: MigrationConfig;
};

process.loadEnvFile(); //charge le .env

// functon qui permet de gerer si une valeur est absente
function envOrThrow(key: string) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
}

const migrationConfig: MigrationConfig = {
  migrationsFolder: "./src/db/migrations",
};

export const config = {
  api: {
    fileServerHits: 0,
    port: Number(envOrThrow("PORT")),
    platform: envOrThrow("PLATFORM"),
  },
  db: {
    url: envOrThrow("DB_URL"),
    migrationConfig: migrationConfig,
  },
};
