# Custom Onboarding Flow Application

> Built for Zealthy - Custom onboarding flow with admin configuration
> 
> This project allows non-technical admins to customize which form components 
> appear on different pages of the user onboarding process.

A full-stack application that allows admins to customize user onboarding flows with configurable components across multiple pages.

## Features

- **User Onboarding Wizard**: 3-step onboarding process with customizable components
- **Admin Panel**: Configure which components appear on each page
- **Data Table**: View all user data and onboarding progress
- **Responsive Design**: Modern UI that works on desktop and mobile

## Tech Stack

- **Frontend**: React 18 with React Router
- **Backend**: Java Spring Boot 3.2.0
- **Database**: PostgreSQL
- **Styling**: Custom CSS with responsive design

## Project Structure

```
├── backend/                 # Spring Boot application
│   ├── src/main/java/      # Java source code
│   ├── src/main/resources/ # Configuration files
│   └── pom.xml            # Maven dependencies
├── frontend/               # React application
│   ├── src/               # React source code
│   ├── public/            # Static files
│   └── package.json       # Node dependencies
└── README.md              # This file
```

## Setup Instructions

### Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- PostgreSQL 12 or higher
- Maven 3.6 or higher

### Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE onboarding_db;
```

2. Create a user (optional):
```sql
CREATE USER postgres WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE onboarding_db TO postgres;
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Update the database configuration in `src/main/resources/application.yml` if needed:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/onboarding_db
    username: postgres
    password: password
```

3. Run the Spring Boot application:
```bash
mvn spring-boot:run
```

The backend will be available at `http://localhost:8080`

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
npm start
```

The frontend will be available at `http://localhost:3000`

## Usage

### User Onboarding Flow

1. Navigate to the main page (`/`)
2. Complete the 3-step onboarding process:
   - **Step 1**: Email and password registration
   - **Step 2**: Configurable components (About Me, Address, Birthdate)
   - **Step 3**: Remaining configurable components

### Admin Panel

1. Navigate to `/admin`
2. Configure which components appear on pages 2 and 3
3. Each page must have at least one component
4. Save the configuration

### Data Table

1. Navigate to `/data`
2. View all user data and onboarding progress
3. Refresh to see updated data

## API Endpoints

### User API
- `POST /api/users/register` - Register a new user
- `GET /api/users/{email}` - Get user by email
- `PUT /api/users/{email}` - Update user data
- `GET /api/users` - Get all users

### Configuration API
- `GET /api/onboarding-config` - Get current configuration
- `PUT /api/onboarding-config` - Update configuration
- `GET /api/onboarding-config/page/{pageNumber}` - Get components for specific page

## Component Types

- **about_me**: Large text area for user description
- **address**: Street address, city, state, and ZIP fields
- **birthdate**: Date picker for birthdate

## Default Configuration

- **Page 2**: About Me, Birthdate
- **Page 3**: Address

## Development

### Backend Development
- Uses Spring Boot with JPA for database operations
- Automatic database schema updates with Hibernate
- CORS enabled for frontend communication

### Frontend Development
- React with functional components and hooks
- Axios for API communication
- Responsive CSS with mobile-first design

## Deployment

### Backend Deployment
1. Build the JAR file:
```bash
mvn clean package
```

2. Run the JAR:
```bash
java -jar target/onboarding-flow-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment
1. Build the production bundle:
```bash
npm run build
```

2. Serve the `build` directory with any static file server

## Testing

The application includes:
- Form validation on both frontend and backend
- Error handling for API calls
- Responsive design testing
- Database persistence verification

## Recent Improvements

### 🔒 Security Enhancements
- **Input Validation**: Added comprehensive input validation and sanitization
- **CORS Configuration**: Updated to support production domains
- **Security Headers**: Enhanced security configurations
- **Password Security**: Added validation for password strength

### ⚡ Performance Optimizations
- **Caching**: Implemented Spring Boot caching for configuration data
- **Database Optimization**: Added batch processing and connection pooling
- **Frontend Optimization**: Added React.memo and useMemo for better performance
- **Lazy Loading**: Optimized component loading

### 🎨 User Experience Improvements
- **Loading States**: Added loading spinners and better feedback
- **Toast Notifications**: Implemented toast notification system
- **Accessibility**: Added support for reduced motion and high contrast
- **Smooth Animations**: Enhanced transitions and micro-interactions
- **Focus Management**: Improved keyboard navigation and focus states

### 🛠 Code Quality
- **Input Validation**: Added InputValidator utility class
- **Error Handling**: Enhanced error handling and user feedback
- **Component Optimization**: Memoized components for better performance
- **Type Safety**: Improved type checking and validation

## Future Enhancements

- User authentication and authorization
- Component ordering within pages
- A/B testing framework
- Analytics and reporting
- Email notifications
- Multi-language support
- Password hashing and encryption
- Rate limiting and API security
- Real-time notifications
- Advanced form validation
