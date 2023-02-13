const env = require('../config/envfile')

module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'API Zen Orgânicos',
    summary: 'A company that sells organic products.',
    description:
      'This API aims to enable the routine operation of a company that sells organic products.',
    version: '1.0',
    termsOfService: `${env.appUrl}/terms`,
    contact: {
      name: 'Jacir Zen',
      email: 'jacir.zen.organicos@gmail.com'
    }
  },
  tags: [
    { name: 'User', description: 'Operations about user' },
    { name: 'Product', description: 'Operations about product' },
    { name: 'Order', description: 'Operations about order' }
  ],
  servers: [
    {
      url: 'https://api-zen-organicos.onrender.com/api',
      description: 'Production API'
    },
    {
      url: env.appUrl,
      description: 'Test API'
    }
  ],
  paths: {
    '/sign-up': {
      post: {
        summary: 'Create user',
        description: 'Route to sign up a new user.',
        tags: ['User'],
        requestBody: {
          required: true,
          $ref: '#/components/requestBodies/UserSignUp'
        },
        responses: {
          201: {
            $ref: '#/components/responses/Created'
          },
          400: {
            $ref: '#/components/responses/BadRequest'
          },
          500: {
            $ref: '#/components/responses/ServerError'
          }
        }
      }
    },
    '/login': {
      post: {
        summary: 'Sign in user',
        description: 'Performs user authentication and returns access token',
        tags: ['User'],
        requestBody: {
          required: true,
          $ref: '#/components/requestBodies/UserLogin'
        },
        responses: {
          200: {
            description: 'Ok',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    token: {
                      type: 'string',
                      description: 'JWT Token for authenticated user',
                      example:
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkJyZW5vIEZlbGl4IiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
                    }
                  }
                }
              }
            }
          },
          400: {
            $ref: '#/components/responses/BadRequest'
          },
          401: {
            $ref: '#/components/responses/Unauthorized'
          },
          500: {
            $ref: '#/components/responses/ServerError'
          }
        }
      }
    },
    '/new-product': {
      post: {
        security: [
          {
            bearerAuth: []
          }
        ],
        summary: 'Create a new product',
        description:
          'This endpoint creates a new product with the given name, price, and supplier. Needed login with admin user ',
        tags: ['Product'],
        requestBody: {
          required: true,
          $ref: '#/components/requestBodies/NewProduct'
        },
        responses: {
          201: {
            $ref: '#/components/responses/Created'
          },
          400: {
            $ref: '#/components/responses/BadRequest'
          },
          401: {
            $ref: '#/components/responses/Unauthorized'
          },
          403: {
            $ref: '#/components/responses/Forbidden'
          },
          500: {
            $ref: '#/components/responses/ServerError'
          }
        }
      }
    },
    '/upload-product': {
      post: {
        security: [
          {
            bearerAuth: []
          }
        ],
        summary: 'Upload many product',
        description:
          'This endpoint create many new product with give csv file. Needed login with admin user ',
        tags: ['Product'],
        requestBody: {
          required: true,
          $ref: '#/components/requestBodies/UploadProduct'
        },
        responses: {
          201: {
            $ref: '#/components/responses/Created'
          },
          400: {
            $ref: '#/components/responses/BadRequest'
          },
          401: {
            $ref: '#/components/responses/Unauthorized'
          },
          403: {
            $ref: '#/components/responses/Forbidden'
          },
          500: {
            $ref: '#/components/responses/ServerError'
          }
        }
      }
    },
    '/index-product': {
      get: {
        security: [
          {
            bearerAuth: []
          }
        ],
        summary: 'Show all products',
        description: 'This endpoint show all products and needed login.',
        tags: ['Product'],
        responses: {
          200: {
            description: 'Ok',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    $ref: '#/components/schemas/Product'
                  }
                }
              }
            }
          },
          401: {
            $ref: '#/components/responses/Unauthorized'
          },
          500: {
            $ref: '#/components/responses/ServerError'
          }
        }
      }
    },
    '/update-product/{product_id}': {
      put: {
        security: [
          {
            bearerAuth: []
          }
        ],
        summary: 'Update a product',
        description:
          'This endpoint updates a product with the given name, price or supplier. Needed login with admin user ',
        tags: ['Product'],
        parameters: [
          {
            name: 'product_id',
            in: 'path',
            description: 'ID of product to update',
            required: true,
            schema: {
              type: 'string',
              description: "The product's id, it must exist",
              required: true,
              example: '63e41caae48b4160afb18192'
            }
          }
        ],
        requestBody: {
          required: true,
          $ref: '#/components/requestBodies/UpdateProduct'
        },
        responses: {
          204: {
            $ref: '#/components/responses/NoContent'
          },
          400: {
            $ref: '#/components/responses/BadRequest'
          },
          401: {
            $ref: '#/components/responses/Unauthorized'
          },
          403: {
            $ref: '#/components/responses/Forbidden'
          },
          500: {
            $ref: '#/components/responses/ServerError'
          }
        }
      }
    },
    '/index-order': {
      get: {
        security: [
          {
            bearerAuth: []
          }
        ],
        summary: 'Show all orders',
        description:
          'This endpoint show all orders as a csv fila and needed login with admin user.',
        tags: ['Order'],
        responses: {
          200: {
            description: 'Ok',
            content: {
              'application/octet-stream': {
                schema: {
                  type: 'string',
                  format: 'binary'
                },
                examples: {
                  order_csv: {
                    value:
                      'Cliente,Produto,Quantidade,ValorUnitario,ValorTotal\nBreno Felix,Couve flor orgânica unidade,3,6,16\nJacir Zen,Cebolinha orgânica maço,6,3,18\n'
                  }
                }
              }
            }
          },
          401: {
            $ref: '#/components/responses/Unauthorized'
          },
          500: {
            $ref: '#/components/responses/ServerError'
          }
        }
      }
    },
    '/new-order': {
      post: {
        security: [
          {
            bearerAuth: []
          }
        ],
        summary: 'Create a new order',
        description:
          'This endpoint creates a new order with the given array of products with quantity. Needed login.',
        tags: ['Order'],
        requestBody: {
          required: true,
          $ref: '#/components/requestBodies/NewOrder'
        },
        responses: {
          201: {
            $ref: '#/components/responses/Created'
          },
          400: {
            $ref: '#/components/responses/BadRequest'
          },
          401: {
            $ref: '#/components/responses/Unauthorized'
          },
          500: {
            $ref: '#/components/responses/ServerError'
          }
        }
      }
    },
    '/upload-order': {
      post: {
        security: [
          {
            bearerAuth: []
          }
        ],
        summary: 'Upload many order',
        description:
          'This endpoint creates a new order with give csv file. Needed login.',
        tags: ['Order'],
        requestBody: {
          required: true,
          $ref: '#/components/requestBodies/UploadOrder'
        },
        responses: {
          201: {
            $ref: '#/components/responses/Created'
          },
          400: {
            $ref: '#/components/responses/BadRequest'
          },
          401: {
            $ref: '#/components/responses/Unauthorized'
          },
          500: {
            $ref: '#/components/responses/ServerError'
          }
        }
      }
    },
    '/update-order/{order_id}': {
      patch: {
        security: [
          {
            bearerAuth: []
          }
        ],
        summary: "Update a order's status",
        description:
          "This endpoint updates a order's status with the given status. Needed login with admin user ",
        tags: ['Order'],
        parameters: [
          {
            name: 'order_id',
            in: 'path',
            description: 'ID of order to update',
            required: true,
            schema: {
              type: 'string',
              description: "The order's id, it must exist",
              required: true,
              example: '63e41caae48b4160afb18192'
            }
          }
        ],
        requestBody: {
          required: true,
          $ref: '#/components/requestBodies/UpdateOrder'
        },
        responses: {
          204: {
            $ref: '#/components/responses/NoContent'
          },
          400: {
            $ref: '#/components/responses/BadRequest'
          },
          401: {
            $ref: '#/components/responses/Unauthorized'
          },
          403: {
            $ref: '#/components/responses/Forbidden'
          },
          500: {
            $ref: '#/components/responses/ServerError'
          }
        }
      }
    }
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: "The user's name",
            required: true,
            example: 'Breno Felix'
          },
          email: {
            type: 'string',
            description: "The user's email, must be unique",
            required: true,
            example: 'brenodev.felix@gmail.com'
          },
          password: {
            type: 'string',
            description: "The user's password",
            required: true,
            example: 'password123'
          },
          admin: {
            type: 'boolean',
            description: "The user's type, default to false",
            default: false
          }
        },
        additionalProperties: false
      },
      Product: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'Automatically generated by Mongoose',
            required: true,
            example: '63e417f8369e2dab767e6ddc'
          },
          name: {
            type: 'string',
            description: "The product's name",
            required: true,
            example: 'Pinhão 1kg'
          },
          price: {
            type: 'number',
            description: "The product's price",
            required: true,
            minimum: 0,
            example: 10.5
          },
          supplier: {
            type: 'string',
            description: "The product's supplier",
            required: true,
            example: 'SUKHAVATI'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            required: true,
            description: 'Automatically generated by Mongoose',
            example: '2023-02-08T21:45:28.016Z'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            required: true,
            description: 'Automatically generated by Mongoose',
            example: '2023-02-08T21:45:28.016Z'
          }
        },
        additionalProperties: false
      },
      Order: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'Automatically generated by Mongoose',
            required: true,
            example: '63e417f8369e2dab767e6ddc'
          },
          user: {
            type: 'object',
            description: "The order's user, it must exist",
            properties: {
              id: {
                type: 'string',
                description: "The user's id, it must exist",
                required: true,
                example: '63e41caae48b4160afb18192'
              },
              name: {
                type: 'string',
                description: "The user's name",
                required: true,
                example: 'Breno Felix'
              }
            }
          },
          products: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                product: {
                  type: 'object',
                  description: 'The product of an order item, it must exist',
                  properties: {
                    id: {
                      type: 'string',
                      description: "The product's id, it must exist",
                      required: true,
                      example: '63e41caae48b4160afb18192'
                    },
                    name: {
                      type: 'string',
                      description: "The product's name",
                      required: true,
                      example: 'Pinhão 1kg'
                    },
                    price: {
                      type: 'number',
                      description: "The product's price",
                      required: true,
                      minimum: 0,
                      example: 10.5
                    },
                    supplier: {
                      type: 'string',
                      description: "The product's supplier",
                      required: true,
                      example: 'SUKHAVATI'
                    }
                  }
                },
                quantity: {
                  type: 'integer',
                  description: "The product's quantity",
                  required: true,
                  minimum: 1,
                  example: 2
                },
                value: {
                  type: 'number',
                  description:
                    'The total price of an order item (product.price * quantity)',
                  required: true,
                  minimum: 0,
                  example: 21
                },
                _id: {
                  type: 'string',
                  description: 'Automatically generated by Mongoose',
                  required: true,
                  example: '63e417f8369e2dab767e6ddc'
                }
              }
            }
          },
          status: {
            type: 'string',
            description: "The order's status",
            required: true,
            example: 'Pedido realizado'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            required: true,
            description: 'Automatically generated by Mongoose',
            example: '2023-02-08T21:45:28.016Z'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            required: true,
            description: 'Automatically generated by Mongoose',
            example: '2023-02-08T21:45:28.016Z'
          }
        },
        additionalProperties: false
      }
    },
    responses: {
      Created: {
        description: 'Created',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  description: 'Success message',
                  default:
                    'The request was successful and a new resource was created as a result.'
                }
              }
            }
          }
        }
      },
      NoContent: {
        description: 'NoContent',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  description: 'Success message',
                  default:
                    'The request was successfully processed but is not returning any content.'
                }
              }
            }
          }
        }
      },
      BadRequest: {
        description: 'Bad Request - Missing or Invalid Parameters',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  description: 'Error message',
                  example: 'Missing param: paramName'
                }
              }
            }
          }
        }
      },
      Unauthorized: {
        description: 'Unauthorized - Incorrect credentials',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  description: 'Error message',
                  example: 'Unauthorized'
                }
              }
            }
          }
        }
      },
      Forbidden: {
        description: 'Forbidden',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  description: 'Error message',
                  example: 'Access denied you do not have permission to access'
                }
              }
            }
          }
        }
      },
      ServerError: {
        description: 'Internal Server Error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  description: 'Error message',
                  example: 'Internal error.'
                }
              }
            }
          }
        }
      }
    },
    requestBodies: {
      UserSignUp: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User'
            }
          }
        },
        description:
          'User object needed to create a new user. RepeatPassword is mandatory and must be equal to password.',
        required: true
      },
      UserLogin: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  description: "The user's email",
                  required: true,
                  example: 'brenodev.felix@gmail.com'
                },
                password: {
                  type: 'string',
                  description: "The user's password",
                  required: true,
                  example: 'password123'
                }
              },
              additionalProperties: false
            }
          }
        },
        description: 'User object needed to sign in a existing user.',
        required: true
      },
      NewProduct: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: "The product's name",
                  required: true,
                  example: 'Pinhão 1kg'
                },
                price: {
                  type: 'number',
                  description: "The product's price",
                  required: true,
                  minimum: 0,
                  example: 10.5
                },
                supplier: {
                  type: 'string',
                  description: "The product's supplier",
                  required: true,
                  example: 'SUKHAVATI'
                }
              }
            }
          }
        },
        description: 'Product object needed to create a new product.',
        required: true
      },
      UploadProduct: {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                file: {
                  type: 'string',
                  description: 'The csv file with many products',
                  format: 'binary'
                }
              }
            }
          }
        },
        description: 'File object needed to upload many products.',
        required: true
      },
      NewOrder: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                products: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      product_id: {
                        type: 'string',
                        description: "Some order's product, it must exist",
                        required: true,
                        example: '63e41caae48b4160afb18192'
                      },
                      quantity: {
                        type: 'integer',
                        description: "The product's quantity",
                        required: true,
                        minimum: 1,
                        example: 2
                      }
                    }
                  }
                }
              }
            }
          }
        },
        description: 'Products array needed to create a new order.',
        required: true
      },
      UploadOrder: {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                file: {
                  type: 'string',
                  description: 'The csv file with new order',
                  format: 'binary'
                }
              }
            }
          }
        },
        description: 'File object needed to upload new order.',
        required: true
      },
      UpdateProduct: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: "The product's name",
                  required: true,
                  example: 'Pinhão 1kg'
                },
                price: {
                  type: 'number',
                  description: "The product's price",
                  required: true,
                  minimum: 0,
                  example: 10.5
                },
                supplier: {
                  type: 'string',
                  description: "The product's supplier",
                  required: true,
                  example: 'SUKHAVATI'
                }
              }
            }
          }
        },
        description: 'Product object needed to update a product.',
        required: true
      },
      UpdateOrder: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'string',
                  description: "The order's status",
                  example: 'Pedido realizado'
                }
              }
            }
          }
        },
        description: 'Order object needed to update a order.',
        required: true
      }
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
}
