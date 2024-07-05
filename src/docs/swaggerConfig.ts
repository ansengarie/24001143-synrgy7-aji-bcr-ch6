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
      },
      {
        url: 'http://localhost:8000'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }],
    tags: [
      {
        name: 'Super Admin'
      },
      {
        name: 'Member'
      }
    ],
    paths: {
      '/api/v1/users/login': {
        post: {
          tags: ['Member'],
          summary: 'Login',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    email: 'herlan@gmail.com',
                    password: '123123'
                  }
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {}
              }
            }
          }
        }
      },
      '/api/v1/users/': {
        post: {
          tags: ['Super Admin'],
          summary: 'Create Admin',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    name: 'aji',
                    email: 'aji@gmail.com',
                    password: '123123'
                  }
                }
              }
            }
          },
          security: [
            {
              bearerAuth: []
            }
          ],
          responses: {
            '201': {
              description: 'Created',
              headers: {
                'X-Powered-By': {
                  schema: {
                    type: 'string',
                    example: 'Express'
                  }
                },
                'Access-Control-Allow-Origin': {
                  schema: {
                    type: 'string',
                    example: '*'
                  }
                },
                'Content-Type': {
                  schema: {
                    type: 'string',
                    example: 'application/json; charset=utf-8'
                  }
                },
                'Content-Length': {
                  schema: {
                    type: 'integer',
                    example: '329'
                  }
                },
                ETag: {
                  schema: {
                    type: 'string',
                    example: 'W/"149-TfAEeMMcftZLvsW1yI4cjOmOl8c"'
                  }
                },
                Date: {
                  schema: {
                    type: 'string',
                    example: 'Fri, 05 Jul 2024 01:38:27 GMT'
                  }
                },
                Connection: {
                  schema: {
                    type: 'string',
                    example: 'keep-alive'
                  }
                },
                'Keep-Alive': {
                  schema: {
                    type: 'string',
                    example: 'timeout=5'
                  }
                }
              },
              content: {
                'application/json': {
                  schema: {
                    type: 'object'
                  },
                  example: {
                    code: 201,
                    status: 'success',
                    message: 'Data disimpan',
                    data: {
                      name: 'aji',
                      email: 'aji@gmail.com',
                      password: '$2b$10$0rYo3jfCy8EwE02dh6wzhOySrfKtCcIzL0dJsf/VfHdCzQy2gpkuS',
                      id: '070bd32e-a8c6-41f0-90a4-704e9a974176',
                      role: 'admin',
                      token: null,
                      created_at: '2024-07-05T01:38:27.751Z',
                      updated_at: '2024-07-05T01:38:27.751Z'
                    }
                  }
                }
              }
            }
          }
        },
        get: {
          tags: ['Super Admin'],
          summary: 'List User',
          security: [
            {
              bearerAuth: []
            }
          ],
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {}
              }
            }
          }
        }
      },
      '/api/v1/cars/': {
        get: {
          tags: ['Member'],
          summary: 'List Car Public',
          security: [
            {
              bearerAuth: []
            }
          ],
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {}
              }
            }
          }
        },
        post: {
          tags: ['Super Admin'],
          summary: 'Create Cars',
          requestBody: {
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    plate: {
                      type: 'string',
                      example: 'CCCCCCCCCC'
                    },
                    manufacture: {
                      type: 'string',
                      example: 'BBBB'
                    },
                    model: {
                      type: 'string',
                      example: 'BBBB'
                    },
                    image: {
                      type: 'string',
                      format: 'binary'
                    },
                    image_public_id: {
                      type: 'string',
                      example: 'ngantuk'
                    },
                    rent_per_day: {
                      type: 'integer',
                      example: '1000'
                    },
                    capacity: {
                      type: 'integer',
                      example: '6'
                    },
                    description: {
                      type: 'string',
                      example: 'bagus'
                    },
                    available_at: {
                      type: 'string',
                      example: '2024-03-03'
                    },
                    transmission: {
                      type: 'string',
                      example: 'manual'
                    },
                    available: {
                      type: 'boolean',
                      example: 'true'
                    },
                    type: {
                      type: 'string',
                      example: 'R'
                    },
                    options: {
                      type: 'string',
                      example: 'CCCCC'
                    },
                    year: {
                      type: 'integer',
                      example: '2019'
                    },
                    specs: {
                      type: 'string',
                      example: '1000 RPM'
                    },
                    '': {
                      type: 'string'
                    }
                  }
                }
              }
            }
          },
          security: [
            {
              bearerAuth: []
            }
          ],
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {}
              }
            }
          }
        }
      },
      '/api/v1/cars/{id}': {
        get: {
          tags: ['Super Admin'],
          summary: 'List Car by Id',
          security: [
            {
              bearerAuth: []
            }
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              schema: {
                type: 'integer'
              },
              required: true,
              example: '5'
            }
          ],
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {}
              }
            }
          }
        },
        patch: {
          tags: ['Super Admin'],
          summary: 'Update Car',
          requestBody: {
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    plate: {
                      type: 'string',
                      example: 'ZZZZZ'
                    },
                    image: {
                      type: 'string',
                      format: 'binary'
                    }
                  }
                }
              }
            }
          },
          security: [
            {
              bearerAuth: []
            }
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              schema: {
                type: 'integer'
              },
              required: true,
              example: '2'
            }
          ],
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {}
              }
            }
          }
        },
        delete: {
          tags: ['Super Admin'],
          summary: 'Delete Car',
          security: [
            {
              bearerAuth: []
            }
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              schema: {
                type: 'integer'
              },
              required: true,
              example: '3'
            }
          ],
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {}
              }
            }
          }
        }
      },
      '/api/v1/users/whoami': {
        get: {
          tags: ['Super Admin'],
          summary: 'WHOAMI',
          security: [
            {
              bearerAuth: []
            }
          ],
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {}
              }
            }
          }
        }
      },
      '/api/v1/users/register': {
        post: {
          tags: ['Member'],
          summary: 'Register',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    name: 'herlan',
                    email: 'herlan@gmail.com',
                    password: '123123'
                  }
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {}
              }
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts'] // Path to your API routes
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec
