/**
 * @swagger
 * /api/v1/accounts/signup:
 *   post:
 *     summary: Allow a user to register in the application
 *     description: Expecting JSON formatted data in request body
 *     tags:
 *         - User
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     $ref: "#/components/schemas/User"
 *
 *     responses:
 *          201:
 *              $ref: "#/components/responses/createdResponse"
 *          400:
 *              $ref: "#/components/responses/badRequest"
 *          409:
 *              $ref: "#/components/responses/conflictResponse"
 *          500:
 *              $ref: "#/components/responses/serverError"
 */

/**
 * @swagger
 * path:
 * /api/v1/accounts/login:
 *   post:
 *     summary: Allow a user to login using email and password
 *     description: A valid email and password is required to a
 *     tags:
 *         - User
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     $ref: "#/components/schemas/LoginInfo"
 *
 *     responses:
 *          200:
 *              $ref: "#/components/responses/successResponse"
 *
 *          400:
 *              $ref: "#/components/responses/badRequest"
 *
 *          500:
 *              $ref: "#/components/responses/serverError"
 *
 */

