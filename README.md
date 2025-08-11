# WTWR (What to Wear?): Back End
The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Features
- User registration and authentication (JWT)
- CRUD operations for clothing items
- Like/unlike functionality for items
- Secure password storage
- Centralized error handling
- Modular code structure (controllers, routes, models, middlewares, utils)

## Running the Project
`npm run start` — to launch the server 

`npm run dev` — to launch the server with the hot reload feature

## Libraries Used
### Dependencies:

- express
- mongoose
- bcryptjs
- jsonwebtoken
- cors
- validator

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
