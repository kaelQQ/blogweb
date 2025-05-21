# Monolog - Modern Blog Platform

A full-stack blog platform built with Node.js, Express, MongoDB, and modern frontend technologies. This platform allows users to read, write, and interact with blog posts in a clean, responsive interface.

## ✨ Features

- **Responsive Design**: Works on all devices with a mobile-first approach
- **Modern UI/UX**: Clean and intuitive user interface with smooth animations
- **Rich Text Editor**: Easy-to-use editor for creating and formatting blog posts
- **Categories & Tags**: Organize content with categories and tags
- **Search Functionality**: Find posts quickly with the search feature
- **Comments & Interactions**: Engage with readers through comments
- **Contact Page**: Easy way for users to get in touch
- **Dark/Light Mode**: Built-in theme switcher (if implemented)

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Styling**: Custom CSS with CSS Variables for theming
- **Icons**: Font Awesome 5
- **Fonts**: Google Fonts (Inter, Playfair Display)
- **Build Tools**: npm scripts
- **Version Control**: Git & GitHub

## Prerequisites

Before running this project, make sure you have the following installed:

1. **Node.js and npm** (Download from [https://nodejs.org/](https://nodejs.org/))
   - Verify installation by running:
   ```bash
   node --version
   npm --version
   ```

2. **MongoDB** (Download from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community))
   - Install MongoDB Community Server
   - Make sure the MongoDB service is running
   - For Windows users:
     - Check Services app to verify MongoDB is running
     - Default installation path: `C:\Program Files\MongoDB\Server\<version>\bin`
    
## 📂 Project Structure

```
blogweb/
├── public/                 # Static files
│   ├── css/                # Stylesheets
│   ├── js/                 # Client-side JavaScript
│   ├── index.html          # Home page
│   ├── about.html          # About page
│   ├── write.html          # Post creation page
│   └── contact.html        # Contact page
├── models/                 # Database models
├── routes/                 # API routes
├── .env.example           # Environment variables example
├── package.json           # Project dependencies
└── server.js              # Main application file
```

## Styling

The project uses modern CSS features including:
- CSS Variables for theming
- Flexbox and Grid for layouts
- CSS Transitions for smooth animations
- Responsive design principles
- Custom form styling
- Mobile-first approach


## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/kaelQQ/blogweb.git
   cd blogweb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure MongoDB**
   - Create a `.env` file in the root directory
   - Add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://127.0.0.1:27017/blogdb
   PORT=3000
   ```
   - If using MongoDB Atlas or a different host, replace the connection string accordingly

4. **Start the server**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`

## Common Issues and Solutions

1. **MongoDB Connection Error**
   - Ensure MongoDB is installed and running
   - Check if MongoDB is running on the default port (27017)
   - Try using `127.0.0.1` instead of `localhost` in the connection string
   - Make sure no firewall is blocking MongoDB connections

2. **Port Already in Use**
   - Change the PORT in .env file
   - Or stop any service using port 3000

3. **Node Modules Missing**
   - Run `npm install` to install dependencies
   - If errors persist, delete `node_modules` folder and `package-lock.json`, then run `npm install` again

## API Endpoints

- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/:id` - Get a specific post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post

### Filtering Options

- `GET /api/posts?tags=tech` - Get posts with a specific tag
- `GET /api/posts?tags=tech,blog` - Get posts with multiple tags
- `GET /api/posts?category=Technology` - Get posts under a specific category
- `GET /api/posts?tags=blog&category=Technology` - Get posts with both specific tags and category

## Testing the API

1. **Using the Web Interface**
   - Open `http://localhost:3000` in your browser
   - Use the provided UI to create, view, and delete posts

2. **Using Postman**
   - Import the provided collection
   - Or create new requests to `http://localhost:3000/api/posts`
   - For POST requests, use this format:
     ```json
     {
         "title": "Post Title",
         "content": "Post Content",
         "author": "Author Name"
     }
     ```

   Example post:
   ```json
   {
       "title": "My blog",
       "content": "Skkkkkkkkrrrrrrtttttt",
       "author": "Kael Quino"
   }
   ```

## Need Help?

If you encounter any issues:
1. Check the console logs for detailed error messages
2. Verify all prerequisites are properly installed
3. Make sure MongoDB is running and accessible
4. Check your firewall settings if connecting to a remote MongoDB instance
