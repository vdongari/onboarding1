-- Database setup script for Onboarding Flow Application
-- Run this script to create the database and user

-- Create database
CREATE DATABASE onboarding_db;

-- Create user (optional - you can use existing postgres user)
-- CREATE USER onboarding_user WITH PASSWORD 'secure_password';

-- Grant privileges
-- GRANT ALL PRIVILEGES ON DATABASE onboarding_db TO onboarding_user;

-- Connect to the database
\c onboarding_db;

-- The tables will be created automatically by Hibernate when the Spring Boot application starts
-- Tables created:
-- - users (stores user information and onboarding progress)
-- - onboarding_configurations (stores admin configuration for component placement)

-- You can verify the tables were created with:
-- \dt
