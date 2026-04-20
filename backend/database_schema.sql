-- Database Schema for Book Manager Application
-- Run this SQL in your MySQL database to create the necessary tables

-- Create database
CREATE DATABASE IF NOT EXISTS book_manager;
USE book_manager;

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Books table for storing book information
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    description TEXT,
    isbn VARCHAR(32),
    publishedDate DATE,
    pages INT,
    category VARCHAR(100),
    imageUrl VARCHAR(500),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_title (title),
    INDEX idx_author (author),
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data for testing
INSERT INTO books (title, author, description, isbn, publishedDate, pages, category, imageUrl) VALUES
('Learning Angular', 'Aristeidis Bampakos', 'A practical guide to building web applications with modern Angular, 5th Edition', '9781803240602', '2025-01-01', 446, 'Web Development', 'https://via.placeholder.com/200x300/007BFF/FFFFFF?text=Learning+Angular'),
('JavaScript: The Good Parts', 'Douglas Crockford', 'A comprehensive guide to the good parts of JavaScript', '9780596517748', '2008-05-01', 176, 'Programming', 'https://via.placeholder.com/200x300/28A745/FFFFFF?text=JavaScript'),
('Clean Code', 'Robert C. Martin', 'A Handbook of Agile Software Craftsmanship', '9780132350884', '2008-08-01', 464, 'Programming', 'https://via.placeholder.com/200x300/DC3545/FFFFFF?text=Clean+Code');

-- Insert a sample user (password: 'password123')
INSERT INTO users (username, password) VALUES
('demo', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Display success message
SELECT 'Database schema created successfully!' AS message;
