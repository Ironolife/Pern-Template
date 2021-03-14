declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    AUTH0_SECRET: string;
    AUTH0_BASE_URL: string;
    AUTH0_ISSUER_BASE_URL: string;
    AUTH0_CLIENT_ID: string;
    AUTH0_CLIENT_SECRET: string;
    AUTH0_AUDIENCE: string;
  }
}