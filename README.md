# WTWR (What to Wear?): Back End
The back-end project for the WTWR application. This back-end repo manages data flow and authentication for the WTWR project.

[Click here to see the front-end repo of the project](https://github.com/reondaze-a/se_project_react)

[WTWR App](https://whattowear.strangled.net/)

## Features
- User registration and authentication (JWT)
- CRUD operations for clothing items
- Like/unlike functionality for items
- Secure password storage
- Centralized error handling
- Modular code structure (controllers, routes, models, middlewares, utils)

## Running the Project
`npm start` — to launch the server 

`npm run dev` — to launch the server with the hot reload feature

## Libraries Used
### Dependencies:

- express
- mongoose
- bcryptjs
- jsonwebtoken
- cors
- validator
- Joi
- celebrate

###   Dev Dependencies:

- nodemon
- eslint
- eslint-config-airbnb-base
- eslint-config-prettier
- eslint-plugin-import
- prettier

## API Endpoints
- `/signup` — Register a new user
- `/signin` — Login
- `/users` — Get user info
- `/items` — CRUD for clothing items
- `/items/:id/likes` — Like/unlike an item
