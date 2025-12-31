# Digital Maintenance Tracker for Apartment Buildings - Backend

A comprehensive **Node.js + TypeScript + Express** backend API for managing maintenance requests in apartment buildings. This system supports three user roles: **Residents**, **Technicians**, and **Administrators**.

## 🚀 Features

### 🏠 For Residents
- Submit maintenance requests with photo/document uploads
- Track request status in real-time (New → Assigned → In-Progress → Completed)
- View complete request history
- Priority-based categorization (Low, Medium, High, Urgent)
- Category selection (Plumbing, Electrical, HVAC, Appliance, General, Emergency)

### 🔧 For Technicians  
- View assigned maintenance requests
- Update job status and add detailed work notes
- Priority-based task management
- Mobile-friendly interface for field work

### 👨‍💼 For Administrators
- Complete overview of all maintenance requests
- Assign technicians to specific requests
- Analytics and reporting dashboard
- User management and system oversight
- Request filtering and search capabilities

## 🏗️ Technical Architecture

- **Backend Framework**: Node.js + Express + TypeScript
- **Database**: MySQL with connection pooling
- **Authentication**: JWT-based with role-based access control (RBAC)
- **File Upload**: Multer with validation and size limits
- **API Documentation**: Swagger/OpenAPI 3.0
- **Security**: Helmet, CORS, Rate limiting, Input validation
- **Validation**: Joi schema validation
- **Error Handling**: Comprehensive error responses

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **MySQL** (v8.0 or higher) 
- **npm** or **yarn**

## 🛠️ Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/Divakar-AIML/Digital-Maintenance-Tracker-for-Apartments-Buildings-Backend.git
cd Digital-Maintenance-Tracker-for-Apartments-Buildings-Backend/backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
```bash
cp .env.example .env
```

Edit `.env` with your database credentials:
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=maintenance_db
DB_USER=root
DB_PASSWORD=your_mysql_password
JWT_SECRET=your_super_secret_jwt_key_here
```

### 4. Database Setup
```bash
# Create database in MySQL first
mysql -u root -p
CREATE DATABASE maintenance_db;
EXIT;

# Run migrations
npm run migrate
```

### 5. Start Development Server
```bash
npm run dev
```

### 6. Access the Application
- **API Server**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api-docs
- **Health Check**: http://localhost:3000/health

## 🔐 Default Login Credentials

After running migrations, these test users are available:

| Role | Email | Password | Description |
|------|-------|----------|-------------|
| **Admin** | admin@maintenance.com | admin123 | Full system access |
| **Technician** | tech1@maintenance.com | admin123 | Job management |
| **Technician** | tech2@maintenance.com | admin123 | Job management |
| **Resident** | resident1@test.com | admin123 | Apt A101 |
| **Resident** | resident2@test.com | admin123 | Apt B205 |

## 📚 API Endpoints

### 🔑 Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### 🏠 Maintenance Requests (Residents)
- `POST /api/requests` - Create maintenance request with file upload
- `GET /api/requests/resident/:id` - Get resident's request history

### 🔧 Maintenance Requests (Technicians)
- `GET /api/requests/technician/:id` - Get assigned requests
- `PUT /api/requests/:id/status` - Update request status and add work notes

### 👨‍💼 Maintenance Requests (Admins)
- `GET /api/requests` - Get all requests (with pagination & filters)
- `PUT /api/requests/:id/assign` - Assign technician to request

### 👥 User Management
- `GET /api/users/profile` - Get current user profile
- `GET /api/users/technicians` - Get all technicians (Admin only)
- `GET /api/users/dashboard-stats` - Get role-based dashboard statistics

## 🗂️ Project Structure

```
backend/
├── src/
│   ├── controllers/         # Request handlers
│   │   ├── authController.ts       # Authentication logic
│   │   ├── requestController.ts    # Maintenance request CRUD
│   │   └── userController.ts       # User management
│   ├── middleware/          # Custom middleware
│   │   ├── auth.ts                 # JWT authentication
│   │   ├── validation.ts           # Joi input validation
│   │   └── upload.ts               # File upload handling
│   ├── routes/              # API route definitions
│   │   ├── auth.ts                 # /api/auth/*
│   │   ├── requests.ts             # /api/requests/*
│   │   └── users.ts                # /api/users/*
│   ├── database/            # Database configuration
│   │   ├── connection.ts           # MySQL connection pool
│   │   ├── schema.sql              # Database schema
│   │   └── migrate.ts              # Migration script
│   ├── types/               # TypeScript interfaces
│   │   └── index.ts                # Type definitions
│   ├── config/              # Configuration files
│   │   └── swagger.ts              # API documentation setup
│   └── server.ts            # Main application entry point
├── uploads/                 # File upload directory
├── dist/                    # Compiled JavaScript (after build)
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── .env.example            # Environment variables template
├── README.md               # This file
├── SETUP-MYSQL.md          # MySQL setup guide
└── DEPLOYMENT.md           # Deployment instructions
```

## 🔧 Available Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Compile TypeScript to JavaScript
npm start        # Start production server
npm run migrate  # Run database migrations
npm test         # Run test suite (when implemented)
```

## 🔒 Security Features

- **JWT Authentication** with secure secret management
- **Role-based Authorization** (Resident/Technician/Admin)
- **Input Validation** using Joi schemas
- **File Upload Security** with type and size restrictions
- **Rate Limiting** (100 requests per 15 minutes per IP)
- **CORS Configuration** for cross-origin requests
- **Security Headers** via Helmet middleware
- **SQL Injection Prevention** using parameterized queries
- **Password Hashing** with bcrypt (10 salt rounds)

## 📊 Database Schema

### Users Table
```sql
- id (Primary Key)
- email (Unique)
- password (Hashed)
- first_name, last_name
- role (resident/technician/admin)
- phone_number, apartment_number
- created_at, updated_at
```

### Maintenance Requests Table
```sql
- id (Primary Key)
- resident_id (Foreign Key → users.id)
- technician_id (Foreign Key → users.id, nullable)
- title, description
- category (plumbing/electrical/hvac/appliance/general/emergency)
- priority (low/medium/high/urgent)
- status (new/assigned/in-progress/completed/cancelled)
- media_urls (JSON array of file paths)
- work_notes (Technician notes)
- completed_at, created_at, updated_at
```

## 🧪 API Testing

### Using Swagger UI
Visit `http://localhost:3000/api-docs` for interactive API documentation.

### Using cURL
```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@maintenance.com","password":"admin123"}'

# Create Request (with token from login)
curl -X POST http://localhost:3000/api/requests \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=Leaky Kitchen Faucet" \
  -F "description=Water dripping from kitchen sink faucet" \
  -F "category=plumbing" \
  -F "priority=medium" \
  -F "files=@photo.jpg"
```

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables (Production)
```env
NODE_ENV=production
PORT=3000
DB_HOST=your_production_db_host
DB_PASSWORD=your_secure_db_password
JWT_SECRET=your_super_secure_jwt_secret
```

### Docker Support (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Team Development

This backend is designed for a **4-person team structure**:

### 👤 Person 1 - Resident Module
- **Backend APIs**: Request creation, resident request history
- **Frontend**: Maintenance request form, request tracking

### 👤 Person 2 - Technician Module  
- **Backend APIs**: Assigned requests, status updates
- **Frontend**: Technician dashboard, job management

### 👤 Person 3 - Admin Module
- **Backend APIs**: All requests overview, technician assignment
- **Frontend**: Admin dashboard, analytics, user management

### 👤 Person 4 - Backend Core & Integration
- **Backend**: Database, authentication, security, deployment
- **Integration**: API testing, documentation, final deployment

## 📞 Support & Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure MySQL is running
   - Check credentials in `.env`
   - Create database: `CREATE DATABASE maintenance_db;`

2. **File Upload Issues**
   - Check `uploads/` directory permissions
   - Verify `MAX_FILE_SIZE` in `.env`

3. **Authentication Issues**
   - Verify `JWT_SECRET` is set in `.env`
   - Check token format: `Bearer <token>`

### Getting Help
- **API Documentation**: http://localhost:3000/api-docs
- **Setup Guide**: `SETUP-MYSQL.md`
- **Deployment Guide**: `DEPLOYMENT.md`

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Future Enhancements

- [ ] Real-time notifications (WebSocket)
- [ ] Email notifications for status updates
- [ ] Mobile app API endpoints
- [ ] Advanced analytics and reporting
- [ ] Integration with external maintenance services
- [ ] Automated request assignment based on technician availability

---

**Built with ❤️ for efficient apartment maintenance management**

## 🏆 Key Achievements

✅ **Production-Ready Backend** with comprehensive error handling  
✅ **Complete API Documentation** with Swagger  
✅ **Role-Based Security** with JWT authentication  
✅ **File Upload System** with validation  
✅ **Database Migrations** with sample data  
✅ **Team-Ready Structure** for collaborative development  
✅ **Comprehensive Testing** endpoints and documentation

## 🔄 Recent Updates

### v2.0.0 - Complete TypeScript Rewrite
- **Upgraded from JavaScript to TypeScript** for better type safety
- **Enhanced Security** with comprehensive middleware
- **Improved Documentation** with Swagger integration
- **Better Error Handling** with detailed responses
- **Production-Ready** deployment configuration
- **Team Collaboration** structure for 4-person development