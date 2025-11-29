import "dotenv/config";

const config = {
  baseUrl: process.env.BASE_URL,
  httpCredentials: {
    username: process.env.HTTP_USERNAME,
    password: process.env.HTTP_PASSWORD
  }
};

export default config;