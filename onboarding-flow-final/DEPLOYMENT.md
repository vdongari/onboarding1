# Deployment Guide

## Quick Start

### Prerequisites
- Java 17+
- Node.js 16+
- PostgreSQL 12+
- Maven 3.6+

### 1. Database Setup
```bash
# Create database
createdb onboarding_db

# Or using psql
psql -c "CREATE DATABASE onboarding_db;"
```

### 2. Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 4. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Admin Panel: http://localhost:3000/admin
- Data Table: http://localhost:3000/data

## Production Deployment

### Backend (Spring Boot)
1. Build JAR:
```bash
cd backend
mvn clean package -DskipTests
```

2. Run JAR:
```bash
java -jar target/onboarding-flow-0.0.1-SNAPSHOT.jar
```

### Frontend (React)
1. Build production bundle:
```bash
cd frontend
npm run build
```

2. Serve with nginx or any static file server:
```bash
# Using serve
npx serve -s build -l 3000

# Using nginx
# Copy build/ contents to nginx html directory
```

### Environment Variables
Set these environment variables for production:

```bash
# Database
export SPRING_DATASOURCE_URL=jdbc:postgresql://your-db-host:5432/onboarding_db
export SPRING_DATASOURCE_USERNAME=your-username
export SPRING_DATASOURCE_PASSWORD=your-password

# Server
export SERVER_PORT=8080
```

## Docker Deployment (Optional)

### Backend Dockerfile
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/onboarding-flow-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

### Frontend Dockerfile
```dockerfile
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
```

## Cloud Deployment Options

### Vercel (Frontend)
1. **Connect Repository**: Import your GitHub repository to Vercel
2. **Configure Project Settings**:
   - **Root Directory**: Set to `frontend/`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`
3. **Environment Variables**: Add any required environment variables
4. **Deploy**: Vercel will automatically deploy on every push to main branch

**Vercel Configuration Files**:
- `vercel.json` (root level) - For monorepo setup
- `frontend/vercel.json` - For frontend-specific settings

**Key Vercel Settings**:
- ✅ Root Directory: `frontend/`
- ✅ Output Directory: `build`
- ✅ Build Command: `npm run build`
- ✅ SPA Routing: Configured with rewrites to handle React Router

### Heroku
1. Create Heroku apps for frontend and backend
2. Add PostgreSQL addon
3. Deploy using Git

### AWS
1. Use Elastic Beanstalk for backend
2. Use S3 + CloudFront for frontend
3. Use RDS for PostgreSQL

### Railway (Backend + Database)
1. **Connect Repository**: Import your GitHub repository to Railway
2. **Add PostgreSQL Service**: 
   - Create a new PostgreSQL database service
   - Note the connection details (DATABASE_URL, DATABASE_USERNAME, DATABASE_PASSWORD)
3. **Deploy Backend**:
   - Set Root Directory to `backend/`
   - Railway will automatically detect the Java/Maven project
   - Add environment variables:
     ```
     DATABASE_URL=jdbc:postgresql://your-railway-db-url:5432/railway
     DATABASE_USERNAME=postgres
     DATABASE_PASSWORD=your-password
     SPRING_PROFILES_ACTIVE=prod
     ```
4. **Deploy**: Railway will build and deploy automatically

### Heroku (Backend)
1. **Create Heroku App**: `heroku create your-app-name`
2. **Add PostgreSQL Addon**: `heroku addons:create heroku-postgresql:hobby-dev`
3. **Set Environment Variables**:
   ```bash
   heroku config:set SPRING_PROFILES_ACTIVE=prod
   heroku config:set DATABASE_URL=$(heroku config:get DATABASE_URL)
   ```
4. **Deploy**: `git push heroku main`

### Docker Deployment
1. **Build Backend Image**:
   ```bash
   cd backend
   docker build -t onboarding-backend .
   ```
2. **Run with Database**:
   ```bash
   # Start PostgreSQL
   docker run --name postgres-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=onboarding_db -p 5432:5432 -d postgres:13
   
   # Start Backend
   docker run --name onboarding-backend -p 8080:8080 -e DATABASE_URL=jdbc:postgresql://host.docker.internal:5432/onboarding_db -e DATABASE_USERNAME=postgres -e DATABASE_PASSWORD=password -e SPRING_PROFILES_ACTIVE=prod -d onboarding-backend
   ```

### AWS (Backend)
1. **Elastic Beanstalk**:
   - Create Java application
   - Upload the JAR file: `target/onboarding-flow-0.0.1-SNAPSHOT.jar`
   - Configure environment variables for database connection
2. **RDS PostgreSQL**: Create managed PostgreSQL database
3. **Environment Variables**:
   ```
   DATABASE_URL=jdbc:postgresql://your-rds-endpoint:5432/onboarding_db
   DATABASE_USERNAME=your-username
   DATABASE_PASSWORD=your-password
   SPRING_PROFILES_ACTIVE=prod
   ```

## Full Stack Deployment

### Recommended Setup: Vercel + Railway
1. **Frontend (Vercel)**:
   - Deploy React app to Vercel with `frontend/` as root directory
   - Set environment variable: `REACT_APP_API_URL=https://your-railway-backend-url.railway.app`

2. **Backend (Railway)**:
   - Deploy Spring Boot app to Railway with `backend/` as root directory
   - Add PostgreSQL service
   - Set environment variables for database connection

3. **Update Frontend API Configuration**:
   ```javascript
   // In frontend/src/services/api.js
   const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
   ```

### CORS Configuration
Update your backend CORS settings for production:

```java
// In your controller or configuration class
@CrossOrigin(origins = {
    "http://localhost:3000",  // Development
    "https://your-vercel-app.vercel.app"  // Production
})
```

## Environment Variables Summary

### Frontend (Vercel)
```
REACT_APP_API_URL=https://your-backend-url.com
```

### Backend (Railway/Heroku/AWS)
```
DATABASE_URL=jdbc:postgresql://your-db-host:5432/onboarding_db
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password
SPRING_PROFILES_ACTIVE=prod
PORT=8080
```

## Monitoring and Logs

### Backend Logs
- Application logs: `backend.log`
- Spring Boot actuator: http://localhost:8080/actuator/health

### Frontend Logs
- Browser console for client-side errors
- Network tab for API call debugging

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check PostgreSQL is running
   - Verify database credentials
   - Ensure database exists

2. **CORS Errors**
   - Backend CORS is configured for localhost:3000
   - Update CORS settings for production domains

3. **Port Conflicts**
   - Backend: Change `server.port` in application.yml
   - Frontend: Change port in package.json scripts

4. **Build Failures**
   - Check Java version (17+)
   - Check Node.js version (16+)
   - Clear Maven cache: `mvn clean`
   - Clear npm cache: `npm cache clean --force`
