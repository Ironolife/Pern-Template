declare namespace NodeJS {
  interface ProcessEnv {
    CORS_ORIGIN: string;
    PORT: string;
    VERSION: string;
    DATABASE_URL: string;
    AUTH0_DOMAIN: string;
    AUTH0_AUDIENCE: string;
    AUTH0_CLAIMS_NAMESPACE: string;
  }
}