// Tags
/**
 * @openapi
 * tags:
 *  name: User
 *  description: Routes for the user App
 */
/**
 * @openapi
 * tags:
 *  name: Reddit
 *  description: Routes that require admin priviledges
 */
/**
 * @openapi
 * tags:
 *  name: Subreddit
 *  description: Routes for user to create and manage tasks
 */
/**
 * @openapi
 * tags:
 *  name: Comments
 *  description: Routes for user to create and manage tasks
 */

// ----------------//-------------//

// Security Schemes
/**
 * @openapi
 * components:
 *  securitySchemes:
 *    Token:
 *      type: http
 *      scheme: Bearer
 *      bearerFormat: JWT
 */

// -------------------//-------------------//

/**
 * @openapi
 * components:
 *  schemas:
 *      errorWithDataResponse:
 *          type: object
 *          example:
 *              status: "fail"
 *              code: 400
 *              data: {'lastName':"A valid last name needs to be more than 10 characters"}
 *          properties:
 *              status:
 *                  type: string
 *                  description: The mongodb generated id of the individual user
 *              code:
 *                  type: number
 *                  description: Associated with the http status
 *              data:
 *                  type: object
 *                  description: An object with key value pairs of missing on invalid data 
 *      errorWithoutResponse:
 *          type: object
 *          properties:
 *              status:
 *                  type: string
 *                  description: Describe the nature of the response based on request
 *                  example: Not found
 *              code:
 *                  type: number
 *                  description: Associated with the http status
 *                  example: 404
 *              message:
 *                  type: string
 *                  description: A short description of what happened
 *                  example: Not found
 *      successResponse:
 *          type: object
 *          example:
 *              status: success
 *              code: 200
 *              data: {'post':"post properties"}
 *          properties:
 *              status:
 *                  type: string
 *                  description: Describe the response
 *              code:
 *                  type: number
 *                  description: Associated with the http status
 *              data:
 *                  type: object
 *                  description: An object with key value pairs of data sent back

 */

/**
 * @openapi
 * components:
 *  responses:
 *    UnauthorizedError:
 *      description: Access token is missing or invalid
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/errorWithoutResponse"
 *          example:
 *              status: fail
 *              code: 401
 *              message: Invalid or missing authorization token
 *    notFound:
 *      description: The requested resource could not be found
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/errorWithoutResponse"
 *            example:
 *              status: fail
 *              code: 404
 *              data: The requested resource could not be found
 *    successResponse:
 *      description: The request was processed successful and data are sent back
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/successResponse"
 *            example:
 *              status: success
 *              code: 200
 *              data: {'key': "Value"}
 *    conflictResponse:
 *      description: The data that was received have conflict with the value in the database
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/errorWithDataResponse"
 *            example:
 *              status: fail
 *              code: 409
 *              data: {"field": "Field already exists"}
 *    serverError:
 *      description: Something went wrong on our servers
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/errorWithoutResponse"
 *          example:
 *              status: error
 *              code: 500
 *              message: Something went wrong on our end
 *    forbidenError:
 *      description: Forbiden access or request
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/errorWithoutResponse"
 *          example:
 *              status: fail
 *              code: 403
 *              message: You dont have permission to perform the request
 *    createdResponse:
 *      description: The request was success and the object was created and returned in respo
 *      content:
 *        application/json:
 *          schema:
 *            #ref: "#/components/schemas/errorWithoutResponse"
 *          example:
 *              status: fail
 *              code: 400
 *              data: {"key": "Value"}
 *    badRequest:
 *      description: Data that was received are not valid. Check the response body for invalid/ missing values
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: string
 *                description: Describe the nature of response
 *              code:
 *                type: number
 *                description: the html status code associated with the response
 *              data:
 *                type: object
 *                description: An object with key value pairs of missing on invalid data
 *            example:
 *              status: fail
 *              code: 400
 *              data: {"name": "Must be at least 5 characters long"}
 *
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - firstName
 *              - lastName
 *              - email
 *              - username
 *              - password
 *          example:
 *              firstName: Delyce
 *              lastName: Alu
 *              email: info@reddit.com
 *              username: delyce
 *              password: delyce@123
 *          properties:
 *              firstName:
 *                  type: string
 *                  description: user first name
 *              lastName:
 *                  type: string
 *                  description: User last name
 *              email:
 *                  type: string
 *                  description: A valid email
 *              username:
 *                  type: string
 *                  description: A username.
 *              password:
 *                  type: string
 *                  description: A user password.

 */

/**
 * @openapi
 * components:
 *  schemas:
 *      LoginInfo:
 *          type: object
 *          required:
 *              - username
 *              - password
 *          example:
 *              username: info@reddit.com
 *              password: delyce@123
 *          properties:
 *              username:
 *                  type: string
 *                  description: A valid email
 *              password:
 *                  type: string
 *                  description: A user password.

 */
