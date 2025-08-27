# Uber Clone Backend

This is a backend server for an Uber-like ride-hailing application, built with Node.js, Express, and MongoDB.

## Features

- User and Captain (driver) registration and login
- JWT-based authentication with token blacklisting for logout
- Profile endpoints for both users and captains
- Password hashing with bcrypt
- Input validation using express-validator
- MongoDB integration via Mongoose
- Environment variable configuration with dotenv

## Project Structure

```
client/
  index.js
server/
  .env
  app.js
  server.js
  package.json
  Controllers/
    captain.controllers.js
    user.controllers.js
  DB/
    connectDb.js
  middlewares/
    auth.middlewares.js
  models/
    blackList.model.js
    captain.model.js
    user.model.js
  Routes/
    captain.route.js
    user.routes.js
  services/
    captain.service.js
    user.service.js
  utils/
    ApiError.js
    ApiResponse.js
    asyncHandler.js
```

## Setup

1. **Install dependencies:**

   ```sh
   cd server
   npm install
   ```

2. **Start the server:**

   ```sh
   node server.js
   ```

   Or with nodemon for development:

   ```sh
   npx nodemon server.js
   ```

## API Endpoints

### User

- `POST /api/v1/user/register` — Register a new user
- `POST /api/v1/user/login` — Login as user
- `GET /api/v1/user/profile` — Get user profile (auth required)
- `GET /api/v1/user/logout` — Logout user (auth required)

### Captain

- `POST /api/v1/captain/register` — Register a new captain
- `POST /api/v1/captain/login` — Login as captain
- `GET /api/v1/captain/profile` — Get captain profile (auth required)
- `GET /api/v1/captain/logout` — Logout captain (auth required)

## Code Highlights

- **Controllers:** Handle request logic ([Controllers/](server/Controllers/))
- **Models:** Mongoose schemas for User, Captain, and BlacklistToken ([models/](server/models/))
- **Routes:** API route definitions ([Routes/](server/Routes/))
- **Services:** Business logic for user and captain ([services/](server/services/))
- **Middlewares:** Authentication and error handling ([middlewares/](server/middlewares/), [utils/](server/utils/))
- **Database:** MongoDB connection ([DB/connectDb.js](server/DB/connectDb.js))

## License

ISC