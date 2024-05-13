const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentación de la REST API para mi servidor Express',
    },
  },
  apis: ['./src/main.js'], 
}

const swaggerSpec = swaggerJsdoc(options)

module.exports = swaggerSpec

