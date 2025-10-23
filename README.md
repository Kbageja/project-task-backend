# Project Management API

A complete Node.js Express backend with MongoDB for managing projects and tasks with JWT authentication.

## 🚀 Features

- User authentication (Register, Login, Logout)
- JWT token-based authorization with HTTP-only cookies
- Password hashing with bcrypt
- Project management (Create, Delete)
- Task management (Add, Update, Delete)
- Winston logger for error tracking
- Input validation on all endpoints

## 📁 Project Structure

```
├── models/
│   ├── User.js
│   ├── Project.js
│   └── Task.js
├── controllers/
│   ├── auth.controller.js
│   ├── project.controller.js
│   └── task.controller.js
├── routes/
│   ├── auth.routes.js
│   ├── project.routes.js
│   └── task.routes.js
├── middleware/
│   └── auth.middleware.js
├── utils/
│   └── validation.js
├── config/
│   └── db.js
├── logs/
├── logger.js
├── seed.js
├── server.js
├── .env
└── package.json
```

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/project_management
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   ```

4. **Create logs directory**
   ```bash
   mkdir logs
   ```

## 🏃 Running the Project

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## 🌱 Seed Database

To populate the database with sample data:

```bash
npm run seed
```

**Seed Data:**
- 1 User (john@example.com / password123)
- 2 Projects linked to the user
- 6 Tasks (3 per project)

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | No |

### Projects
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/projects/create` | Create project | Yes |
| DELETE | `/api/projects/delete?projectId=xxx` | Delete project | Yes |
| PUT | `/api/projects/updateAll` | Update Project | Yes |

### Tasks
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/tasks/add` | Add task | Yes |
| PUT | `/api/tasks/update` | Update task status | Yes |
| DELETE | `/api/tasks/delete` | Delete task | Yes |

## 📝 Request Examples

### Register
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Project
```json
POST /api/projects/create
{
  "name": "My New Project",
  "userId": "user_id_here"
}
```

### Add Task
```json
POST /api/tasks/add
{
  "title": "Task title",
  "description": "Task description",
  "projectId": "project_id_here",
  "userId": "user_id_here"
}
```

### Update Task
```json
PUT /api/tasks/update
{
  "taskId": "task_id_here",
  "status": "completed"
}
```
**Valid statuses:** `pending`, `in-progress`, `completed`

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Winston** - Logging
- **Cookie-parser** - Cookie handling
- **CORS** - Cross-origin resource sharing

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.0",
  "bcrypt": "^5.1.1",
  "jsonwebtoken": "^9.0.2",
  "cookie-parser": "^1.4.6",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "winston": "^3.11.0"
}
```

## 🔒 Security Features

- Passwords hashed with bcrypt (10 rounds)
- JWT tokens stored in HTTP-only cookies
- Protected routes with authentication middleware
- Email validation
- Input sanitization and validation

## 📄 License

MIT

---

**Happy Coding! 🚀**
