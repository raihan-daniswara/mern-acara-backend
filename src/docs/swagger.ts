import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "v0.0.1",
    title: "Dokumentasi API Backend Acara",
    description:
      "Dokumentasi API untuk aplikasi Backend Acara. API ini menyediakan fitur autentikasi user, registrasi, login, profil user, dan pengelolaan data acara.",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Local Development Server",
    },
    {
      url: "https://mern-acara-backend.vercel.app/api",
      description: "Deploy Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      LoginRequest: {
        identifier: "raihan.daniswara15@gmail.com",
        password: "123123",
      },
      RegisterRequest: {
        fullName: "Raihan Daniswara",
        username: "raihan_daniswara",
        email: "raihan.daniswara15@gmail.com",
        password: "123123",
        confirmPassword: "123123",
      },
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointFiles = ["../routes/api.ts"];

swaggerAutogen({ openapi: "3.1.0" })(outputFile, endpointFiles, doc);
