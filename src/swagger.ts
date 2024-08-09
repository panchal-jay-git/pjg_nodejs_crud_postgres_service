import swaggerJsdoc from "swagger-jsdoc";
import swaggerDefinition from "./swagger_config/swagger_config.json"


// Setup Swagger options
const swaggerOptions = {
  swaggerDefinition,
  apis: [], // No need for additional API file references
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

export default swaggerDocs;


