// Mapper for environment variables
// You need to create own env file
export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;

export const db = {
  name: process.env.DB_NAME ?? '',
  host: process.env.DB_HOST ?? '',
  port: process.env.DB_PORT ?? '',
  user: process.env.DB_USER ?? '',
  password: process.env.DB_USER_PWD ?? '',
  authSource: process.env.DB_AUTHENTICATION_NAME ?? '',
  pool: {
    min: 0,
    max: 10,
  },
};


export const logDirectory = process.env.LOG_DIR;
export const corsUrl = process.env.CORS_URL;
