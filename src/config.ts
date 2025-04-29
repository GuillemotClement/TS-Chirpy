type APIConfig = {
  fileserverHits: number;
  dbURL: string;
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

export const config = {
  fileserverHits: 0,
  dbURL: envOrThrow("DB_URL"),
};
