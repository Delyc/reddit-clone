/**
 * @swagger
 * /api/v1/reddits:
 *   post:
 *     summary: Allow a user to create a sub-reddit
 *     description: Expecting JSON formatted data in request body
 *     tags:
 *         - Reddit
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
 * /api/v1/reddits/all:
 *   get:
 *     summary: Get all subreddits randomly
 *     description: You receive a paginated list of reddits. Customize limit by using quries and use included data for pagination
 *     tags:
 *         - Reddit
 *     parameters:
 *          - in: query
 *            name: limit
 *            description: The total number of objects to return
 *          - in: query
 *            name: page
 *            description: The page number to get data for
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

/**
 * @swagger
 * /api/v1/reddits/{id}:
 *   get:
 *     security:
 *       - Token: []
 *     summary: Get reddits for a given entry.
 *     description: Find and update the currently authenticated user with a valid token.
 *     tags:
 *         - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: A valid mongodb user id. Returned when user signup.
 *         schema:
 *           type: string

 *     responses:
 *       201:
 *         $ref: "#/components/responses/createdResponse"
 *       400:
 *           $ref: "#/components/responses/badRequest"
 *       401:
 *           $ref: "#/components/responses/UnauthorizedError"
 *       409:
 *           $ref: "#/components/responses/conflictResponse"
 *       500:
 *           $ref: "#/components/responses/serverError"
 */

/**
 * @swagger
 * /api/v1/accounts/{id}:
 *   delete:
 *     security:
 *       - Token: []
 *     summary: Delete a user specified in the id.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     tags:
 *         - Reddit
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: A valid mongodb user id. Returned when user signup.
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              required:
 *                - password
 *              properties:
 *                password:
 *                  type: string
 *                  example: Atlp@20220
 *
 *     responses:
 *       200:
 *           $ref: "#/components/responses/successResponse"
 *       400:
 *           $ref: "#/components/responses/badRequest"
 *       401:
 *           $ref: "#/components/responses/UnauthorizedError"
 *       500:
 *           $ref: "#/components/responses/serverError"
 */

/**
 * @swagger
 * path:
 * /api/v1/accounts/logout:
 *   post:
 *     summary: Allow a user to logout
 *     description: A valid token is required to process request
 *     tags:
 *         - User
 *     responses:
 *         200:
 *             $ref: "#/components/responses/successResponse"
 *         401:
 *             $ref: "#/components/responses/UnauthorizedError"
 *         403:
 *             $ref: "#/components/responses/forbidenError"
 *         500:
 *             $ref: "#/components/responses/serverError"
 *
 */
