# SnapGrid - Social Media Application

A modern, full-stack social media application build with the MERN stack. This project demonstrates proficiency in building production-ready web applications with authentication, real-time updates, and file upload capabilities.

## 🚀 Tech Stack

### Frontend
- **React 19** - Modern UI library with Hooks
- **Vite** - Fast build tool and dev server
- **Material UI (MUI)** - Component library for polished UI
- **React Router v7** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Context API** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB Atlas** - Cloud NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Secure authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload middleware

## ✨ Features

### Authentication
- User signup and login with JWT
- Secure password hashing
- Protected routes and middleware
- Persistent sessions with localStorage

### Posts
- Create posts with captions and/or images
- File upload for images (stored on server)
- View feed sorted by newest first
- Like/unlike posts (no duplicate likes)
- Real-time UI updates

### Social Interactions
- Comment on posts
- View all comments with timestamps
- Expandable comment sections
- User avatars with initials

### UI/UX
- SnapGrid-inspired minimal design
- Responsive layout (mobile & desktop)
- Loading states and spinners
- Empty state messages
- Error handling with user-friendly alerts
- Image preview before posting

## 📁 Project Structure

```
social_app/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── models/            # Mongoose schemas
│   │   ├── routes/            # API route definitions
│   │   ├── middleware/        # Auth & upload middleware
│   │   ├── app.js             # Express app config
│   │   └── server.js          # Entry point
│   ├── uploads/               # User-uploaded images
│   ├── .env                   # Environment variables
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/        # Reusable UI components
    │   ├── pages/             # Route pages
    │   ├── context/           # React Context (Auth)
    │   ├── api/               # Axios configuration
    │   ├── App.jsx            # Main app component
    │   └── main.jsx           # Entry point
    ├── index.html
    └── package.json
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_secret_key
```

4. Create the uploads directory:
```bash
mkdir uploads
```

5. Start the server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### First Run

1. Open `http://localhost:5173` in your browser
2. Click "Sign Up" to create an account
3. Log in with your credentials
4. Start creating posts!

## 🔐 Environment Variables

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/` |
| `JWT_SECRET` | Secret key for JWT signing | `cryptographically_strong_random_string` |

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Authenticate user

### Posts
- `GET /api/posts` - Get all posts (newest first)
- `POST /api/posts` - Create new post (multipart/form-data)
- `POST /api/posts/:id/like` - Like a post
- `POST /api/posts/:id/comment` - Add comment to post

All protected endpoints require `Authorization: Bearer <token>` header.

## 🚀 Deployment

### Backend Deployment (Render/Railway/Heroku)

1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables in platform dashboard
4. Deploy automatically on push to main branch

### Frontend Deployment (Netlify)

1. Push code to GitHub
2. Import project to Netlify
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Update API base URL in `frontend/src/api/axios.js` to production backend URL

### Production Considerations

- Use environment-specific API URLs
- Enable CORS for production domain
- Serve uploaded images from cloud storage (AWS S3, Cloudinary)
- Add rate limiting for API endpoints
- Implement image compression
- Add database indexes for performance

## 🎯 Future Enhancements

- [ ] User profiles with bio and profile pictures
- [ ] Follow/unfollow functionality
- [ ] Direct messaging
- [ ] Stories feature
- [ ] Image filters and editing
- [ ] Search and hashtags
- [ ] Notifications
- [ ] Pagination for feed
- [ ] Cloud storage for images (AWS S3)

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Developed as a portfolio project to demonstrate full-stack development skills with the MERN stack.

---

**Note**: This is a learning project and not intended for production use without additional security hardening and scalability improvements.
