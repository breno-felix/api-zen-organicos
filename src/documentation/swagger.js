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
  tags: [{ name: 'User', description: 'Operations about user' }],
  servers: [
    {
      url: env.appUrl,
      description: 'API de produção'
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
      NewCategory: {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: "The category's name, it must be unique",
                  required: true,
                  example: 'Petiscos'
                },
                file: {
                  type: 'string',
                  description: "The category's image (jpeg, pjpeg, png, gif)",
                  required: true,
                  format: 'binary'
                }
              }
            }
          }
        },
        description: 'Category object needed to create a new category.',
        required: true
      },
      NewProduct: {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: "The product's name",
                  required: true,
                  example: 'Batata Frita'
                },
                price: {
                  type: 'number',
                  description: "The product's price",
                  required: true,
                  minimum: 0,
                  example: 10.5
                },
                category_id: {
                  type: 'string',
                  description: "The product's category, it must exist",
                  required: true,
                  example: '63e41caae48b4160afb18192'
                },
                offer: {
                  type: 'boolean',
                  description: "The product's offer, default to false",
                  required: false,
                  example: true
                },
                file: {
                  type: 'string',
                  description: "The product's image (jpeg, pjpeg, png, gif)",
                  required: true,
                  format: 'binary'
                }
              }
            }
          }
        },
        description: 'Product object needed to create a new product.',
        required: true
      },
      NewOrder: {
        content: {
          'application/json': {
            schema: {
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
        },
        description: 'Products array needed to create a new order.',
        required: true
      },
      UpdateCategory: {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: "The category's name, it must be unique",
                  example: 'Petiscos'
                },
                file: {
                  type: 'string',
                  description: "The category's image (jpeg, pjpeg, png, gif)",
                  format: 'binary'
                }
              }
            }
          }
        },
        description: 'Category object needed to update a category.',
        required: true
      },
      UpdateProduct: {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: "The product's name",
                  example: 'Batata Frita'
                },
                price: {
                  type: 'number',
                  description: "The product's price",
                  minimum: 0,
                  example: 10.5
                },
                category_id: {
                  type: 'string',
                  description: "The product's category, it must exist",
                  example: '63e41caae48b4160afb18192'
                },
                offer: {
                  type: 'boolean',
                  description: "The product's offer, default to false",
                  example: true
                },
                file: {
                  type: 'string',
                  description: "The product's image (jpeg, pjpeg, png, gif)",
                  format: 'binary'
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
