# Revnology Frontend App - Basic Task

Frontend app implementation for the Revnology assignment.

## Features

### Authentication
- Login functionality with email/password
- Registration system for new users
- Protected dashboard routes
- Logout functionality

### User Management
- View list of users
- Create new users
- Edit existing users
- Delete users
- Basic role management (Admin/User)

## Tech Stack
- Next.js 14
- React
- Tailwind CSS
- Lucide React (for icons)
- Context API (for state management)

## Prerequisites
- Node.js 16.8 or later
- npm or yarn package manager

## Installation
1. Clone the repository:
```bash
git clone https://github.com/tanjavier/Revnology.git
cd Revnology/Frontend/Basic
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open http://localhost:3000 in your browser

## Project Structure
```
Basic/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── users/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── edit/
│   │   │   │   │       └── page.js
│   │   │   │   ├── new/
│   │   │   │   │   └── page.js
│   │   │   │   └── page.js
│   │   │   └── page.js
│   │   ├── login/
│   │   │   └── page.js
│   │   ├── register/
│   │   │   └── page.js
│   │   ├── layout.js
│   │   └── page.js
│   ├── components/
│   │   ├── DashboardLayout.js
│   │   ├── LoginForm.js
│   │   ├── RegisterForm.js
│   │   ├── UserForm.js
│   │   └── UsersList.js
│   ├── contexts/
│   │   └── AuthContext.js
│   └── services/
│       └── userService.js
└── package.json
```
