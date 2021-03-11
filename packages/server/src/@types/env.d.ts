declare namespace NodeJS {
  interface ProcessEnv {
    CORS_ORIGIN: string;
    PORT: string;
    VERSION: string;
    DATABASE_URL: string;
  }
}