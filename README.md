# Task Manager Frontend

A modern, beautiful Task Manager application built with React, TypeScript, and Tailwind CSS. Features a clean, responsive UI with authentication, task management, and real-time updates.

## ✨ Features

### 🔐 Authentication
- **JWT-based authentication** with persistent sessions
- **Sign up** and **login** forms with validation
- **Protected routes** with automatic redirects
- **Persistent login state** across browser sessions

### 📋 Task Management
- **Create, edit, and delete** tasks with rich forms
- **Task filtering** by status (All, Pending, In Progress, Completed)
- **Infinite scroll** for smooth task browsing
- **Task insights** with statistics and analytics
- **Real-time updates** with React Query

### 🎨 Modern UI/UX
- **Responsive design** that works on all devices
- **Beautiful Tailwind CSS** styling with rounded corners and shadows
- **Smooth transitions** and animations
- **Toast notifications** for user feedback
- **Loading states** and empty state messages
- **Icon buttons** with Lucide React icons

### 🏗️ Architecture
- **TypeScript** for type safety
- **React Query** for efficient API state management
- **React Context** for global authentication state
- **React Router v6** for navigation
- **Form validation** with React Hook Form + Zod
- **Accessible modals** with Headless UI

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: React Query (@tanstack/react-query)
- **Forms**: React Hook Form + Zod validation
- **UI Components**: Headless UI
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **HTTP Client**: Axios
- **Infinite Scroll**: react-infinite-scroll-component

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd offpista-task-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AuthForm.tsx    # Login/signup form
│   ├── DashboardLayout.tsx
│   ├── TaskCard.tsx
│   ├── TaskFormModal.tsx
│   ├── FilterTabs.tsx
│   ├── InsightsPanel.tsx
│   ├── ConfirmModal.tsx
│   └── TaskTable.tsx
├── pages/              # Page components
│   ├── Login.tsx
│   ├── Signup.tsx
│   └── Dashboard.tsx
├── contexts/           # React Context providers
│   └── AuthContext.tsx
├── hooks/              # Custom React hooks
│   ├── useLogin.ts
│   ├── useSignup.ts
│   ├── useGetTask.ts
│   └── useDeleteTask.ts
├── services/           # API services
│   └── api.ts
└── main.tsx           # App entry point
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### API Configuration
The app expects a REST API with the following endpoints:

- `POST /auth/signup` - User registration
- `POST /auth/login` - User authentication
- `GET /tasks` - Fetch tasks (with pagination)
- `POST /tasks` - Create task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task
- `GET /tasks/insights` - Get task statistics

## 🎯 Key Features Explained

### Authentication Flow
1. **Sign up/Login**: Users can create accounts or log in
2. **JWT Storage**: Tokens are stored in localStorage
3. **Persistent Sessions**: User state persists across browser sessions
4. **Protected Routes**: Dashboard requires authentication
5. **Auto-redirect**: Unauthenticated users are redirected to login

### Task Management
1. **Infinite Scroll**: Load tasks progressively as user scrolls
2. **Real-time Updates**: React Query handles caching and updates
3. **Filtering**: Filter tasks by status with beautiful tabs
4. **CRUD Operations**: Full create, read, update, delete functionality
5. **Confirmation Modals**: Safe delete operations with confirmation

### State Management
- **React Query**: Handles server state (API calls, caching, synchronization)
- **React Context**: Manages authentication state globally
- **Local State**: Component-specific state with useState/useEffect

## 🎨 UI Components

### Dashboard Layout
- **Sidebar Navigation**: Clean sidebar with logout functionality
- **Header**: User greeting and navigation
- **Main Content**: Task table with infinite scroll
- **Insights Panel**: Task statistics and analytics

### Task Components
- **Task Table**: Responsive table with edit/delete actions
- **Task Form Modal**: Beautiful form for creating/editing tasks
- **Filter Tabs**: Status-based filtering with smooth animations
- **Confirm Modal**: Safe delete operations

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Automatic redirect for unauthenticated users
- **Axios Interceptors**: Automatic token inclusion in API requests
- **Form Validation**: Client-side validation with Zod schemas
- **Error Handling**: Graceful error handling with user feedback

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full sidebar layout with task table
- **Tablet**: Adaptive layout with collapsible sidebar
- **Mobile**: Mobile-optimized layout with touch-friendly controls

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Vite** for the fast build tool
- **Tailwind CSS** for the beautiful styling
- **React Query** for efficient state management
- **Headless UI** for accessible components
- **Lucide React** for beautiful icons
