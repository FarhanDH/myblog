// load configurations from .env file
export const config = () => {
  return {
    serverPort: process.env.PORT,

    // database configurations
    dbUrl: process.env.DATABASE_HOST as string,

    // jwt configurations
    jwtSecret: process.env.JWT_SECRET as string,
  };
};
