import swaggerJSDoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Binar Car Rental',
      version: '1.0.0',
      description: 'Documentation API Binar Car Rental | Aji Nuansa Sengarie'
    },
    servers: [
      {
        url: 'https://respective-erminie-ansengarie-e5a51b94.koyeb.app'
      }
    ]
  },
  apis: ['./src/routes/*.ts'] // Path to your API routes
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec
