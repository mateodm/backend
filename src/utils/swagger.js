import swaggerJsDoc from "swagger-jsdoc";
import { __dirname } from "./utils.js";

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentación de E-Commerce mi rey",
      description: "Importante estar logeado, si no la mayoria de peticiones fallaran(ya sea como admin o user/premium)"
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`]
};

export const specs = swaggerJsDoc(swaggerOptions);