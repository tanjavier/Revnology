# Revnology Assignment

This repository contains my implementation of the Revnology technical assignment, which consists of three main sections:
- Backend Development 
- Web App Frontend 
- Mobile App Frontend 

## Project Structure
```
Revnology/
├── Backend/              
├── Frontend/             
│   └── Basic/           
└── Mobile/              
```

## Backend Development
The backend implementation is built using Node.js and MySQL, featuring:
- Authentication system
- User management
- Order management
- File upload capabilities
- Payment integration
- Social login

### Tech Stack
- Framework: Express.js
- Database: MySQL
- Authentication: JWT
- File Upload: Multer
- Real-time Features: Socket.io
- Payment: Stripe Integration

For detailed information about the backend implementation, please visit the [Backend directory](./Backend).

## Web App Frontend
The frontend implementation is divided into different requirement levels. Currently implemented:

### Basic Implementation
A Next.js application featuring:
- Authentication UI
- User CRUD operations
- Dashboard interface
- Protected routing

### Tech Stack
- Framework: Next.js 13 (App Router)
- Styling: Tailwind CSS
- State Management: React Context
- Icons: Lucide React

For detailed information about the basic frontend implementation, please visit the [Frontend/Basic directory](./Frontend/Basic).

## Getting Started

### Backend Setup
1. Navigate to the backend directory:
```bash
cd Backend
```
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the same directory:
```env
PORT=3000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=revnology_db
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=http://localhost:3000
STRIPE_SECRET_KEY=your_stripe_secret_key
```
4. Set up the database:
```bash
mysql -u your_username -p < database.sql
```

5. Create upload directories:
```bash
mkdir uploads
mkdir uploads/profiles
mkdir uploads/documents
```

6. Start the server:
```bash
npm start
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd Frontend/Basic
```
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

## Progress Tracking

### Section A: Backend ✅
- [✅] Basic Requirements
- [✅] Intermediate Requirements
- [✅] Advanced Requirements

### Section B: Frontend
- [✅] Basic Requirements
- [ ] Intermediate Requirements
- [ ] Advanced Requirements

### Section C: Mobile App
- [ ] Basic Requirements
- [ ] Intermediate Requirements
- [ ] Advanced Requirements
