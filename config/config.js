import "dotenv/config";

const hasHttpCreds = process.env.HTTP_USERNAME && process.env.HTTP_PASSWORD;

const config = {
  baseUrl: process.env.BASE_URL,
  httpCredentials: hasHttpCreds ? {
    username: process.env.HTTP_USERNAME,
    password: process.env.HTTP_PASSWORD
  }
    : undefined
};

export default config;