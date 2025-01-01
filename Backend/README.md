# Revnology Backend API

Backend API implementation for the Revnology assignment.

## Features

### Basic Features
- User Authentication (Email/Phone)
- User CRUD Operations
- JWT-based Authorization

### Intermediate Features
- Order Management System
- Automatic Inactive User Cleanup
- Profile Picture Upload
- Secure Document Upload/Download (IC/Passport)
- Order History Tracking

### Advanced Features
- Real-time User Online Status
- Payment Gateway Integration (Stripe)
- Social Login (Google OAuth)

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT, Passport.js
- **File Upload**: Multer
- **Real-time**: Socket.io
- **Payment**: Stripe

## Prerequisites

- Node.js (v14 or higher)
- MySQL
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/tanjavier/Revnology.git
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
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

## Project Structure

```
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── socialAuth.js
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── orderController.js
│   │   ├── paymentController.js
│   │   └── socialAuthController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── socialAuthRoutes.js
│   ├── services/
│   │   ├── socketService.js
│   │   └── paymentService.js
│   └── index.js
├── uploads/
│   ├── profiles/
│   └── documents/
├── database.sql
├── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - User login
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/google/callback` - Google OAuth callback

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get specific user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/:userId/status` - Check user online status
- `POST /api/users/profile-picture` - Upload profile picture
- `POST /api/users/document` - Upload user document
- `GET /api/users/document` - Get user document

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's order history
- `GET /api/orders/:orderId` - Get specific order details

### Payments
- `POST /api/payments/create-intent` - Create payment intent

## Running the Application

1. Start the server:
```bash
npm start
```

2. For development with auto-reload:
```bash
npm run dev
```

## Testing APIs

You can test the APIs using cURL or Postman. Here are some example cURL commands:

### Register User
```bash
curl -X POST http://localhost:3000/api/register \
-H "Content-Type: application/json" \
-d '{
    "email": "test@example.com",
    "password": "password123"
}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/login \
-H "Content-Type: application/json" \
-d '{
    "email": "test@example.com",
    "password": "password123"
}'
```

### Create Order
```bash
curl -X POST http://localhost:3000/api/orders \
-H "Authorization: Bearer YOUR_TOKEN_HERE" \
-H "Content-Type: application/json" \
-d '{
    "total_amount": 100.50,
    "items": [
        {
            "product_name": "Product 1",
            "quantity": 2,
            "price": 50.25
        }
    ]
}'
```

## Security Features

- JWT-based authentication
- Password hashing
- Protected file uploads
- Secure document storage
- OAuth2 integration

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error
