# Simple Blog API

A simple RESTful API for a blog using Express.js and MongoDB.

## Prerequisites

- Node.js and npm (Download from: https://nodejs.org/)
- MongoDB (Download from: https://www.mongodb.com/try/download/community)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with:
   ```
   MONGODB_URI=mongodb://localhost:27017/blogdb
   PORT=3000
   ```

3. Start MongoDB service on your machine

4. Run the server:
   ```bash
   npm run dev    # Development mode with auto-reload
   # or
   npm start      # Production mode
   ```

## API Endpoints

- **GET /api/posts** - Get all posts
- **GET /api/posts/:id** - Get a specific post
- **POST /api/posts** - Create a new post
  ```json
  {
    "title": "Post Title",
    "content": "Post Content",
    "author": "Author Name"
  }
  ```
- **PUT /api/posts/:id** - Update a post
- **DELETE /api/posts/:id** - Delete a post

## Testing with Postman

1. Import this Postman collection: [Blog API Collection](./blog-api-collection.json)
2. Or create new requests to `http://localhost:3000/api/posts`

## Example Usage

### Create a Post
```http
POST http://localhost:3000/api/posts
Content-Type: application/json

{
    "title": "My blog",
    "content": "Skkkkkkkkrrrrrrtttttt",
    "author": "Kael Quino"
}
```
