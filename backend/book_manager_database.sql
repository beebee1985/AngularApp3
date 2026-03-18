-- ========================================
-- Book Manager Database Setup Script
-- MWD4B Angular Assignment 3
-- Date: March 2024
-- ========================================

-- Create database
CREATE DATABASE IF NOT EXISTS book_manager 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Use the database
USE book_manager;

-- Create books table
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    isbn VARCHAR(20) NOT NULL UNIQUE,
    published_date DATE,
    pages INT NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Add indexes for better performance
    INDEX idx_title (title),
    INDEX idx_author (author),
    INDEX idx_category (category),
    INDEX idx_isbn (isbn),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data
INSERT INTO books (title, author, description, isbn, published_date, pages, category, image_url) VALUES

('Learning Angular', 'Aristeidis Bampakos', 'A practical guide to building web applications with modern Angular, 5th Edition. This comprehensive book covers Angular fundamentals, components, services, routing, and advanced topics for building scalable web applications.', '978-1803240602', '2023-02-28', 446, 'Web Development', 'https://via.placeholder.com/200x300/007BFF/FFFFFF?text=Learning+Angular'),

('TypeScript in 50 Lessons', 'Stefan Baumgartner', 'Learn TypeScript by building real applications. This book teaches TypeScript through practical examples and hands-on exercises, perfect for JavaScript developers making the transition.', '978-1617299506', '2021-10-19', 400, 'Programming', 'https://via.placeholder.com/200x300/28A745/FFFFFF?text=TypeScript+50'),

('Angular: Up and Running', 'Shyam Seshadri', 'Learning Angular: Step-by-Step Guide to Building Fast, Secure, and Robust Full Stack Applications. Covers Angular fundamentals, testing, deployment, and best practices.', '978-1491999820', '2018-02-13', 302, 'Web Development', 'https://via.placeholder.com/200x300/17A2B8/FFFFFF?text=Angular+Up+Running'),

('Pro Angular 6', 'Adam Freeman', 'The most comprehensive guide to Angular. This book provides detailed coverage of Angular features and functionality, with practical examples and real-world applications.', '978-1484236406', '2018-10-09', 781, 'Web Development', 'https://via.placeholder.com/200x300/FFC107/FFFFFF?text=Pro+Angular+6'),

('RxJS in Action', 'Paul Daniels', 'Learn reactive extensions for JavaScript with RxJS. This book covers observables, operators, and reactive programming patterns for building asynchronous applications.', '978-1617293412', '2017-08-20', 312, 'JavaScript', 'https://via.placeholder.com/200x300/DC3545/FFFFFF?text=RxJS+Action'),

('JavaScript: The Good Parts', 'Douglas Crockford', 'A deep dive into the good parts of JavaScript. This classic book helps developers understand the elegant, powerful, and often misunderstood features of JavaScript.', '978-0596517748', '2008-05-08', 176, 'JavaScript', 'https://via.placeholder.com/200x300/6F42C1/FFFFFF?text=JS+Good+Parts'),

('Clean Code', 'Robert C. Martin', 'A handbook of agile software craftsmanship. This essential book teaches the principles and practices of writing clean, readable, and maintainable code.', '978-0132350884', '2008-08-01', 464, 'Programming', 'https://via.placeholder.com/200x300/6C757D/FFFFFF?text=Clean+Code'),

('Angular Security', 'Philippe De Ryck', 'Implementing security best practices in Angular applications. This book covers authentication, authorization, HTTPS, CSP, and other security considerations.', '978-1617297427', '2020-12-15', 256, 'Web Development', 'https://via.placeholder.com/200x300/FD7E14/FFFFFF?text=Angular+Security'),

('Testing Angular Applications', 'Jesse Palmer', 'A comprehensive guide to testing Angular applications. Covers unit testing, integration testing, end-to-end testing, and testing best practices.', '978-1617293641', '2018-11-11', 320, 'Testing', 'https://via.placeholder.com/200x300/20C997/FFFFFF?text=Testing+Angular'),

('Node.js Design Patterns', 'Mario Casciaro', 'Design and implement production-grade Node.js applications using proven patterns. Essential for full-stack developers working with Angular and Node.js.', '978-1785885587', '2016-07-29', 526, 'Backend Development', 'https://via.placeholder.com/200x300/495057/FFFFFF?text=Node+Patterns');

-- Create a view for book statistics (optional)
CREATE VIEW book_stats AS
SELECT 
    category,
    COUNT(*) as book_count,
    AVG(pages) as avg_pages,
    MIN(published_date) as oldest_book,
    MAX(published_date) as newest_book
FROM books 
GROUP BY category;

-- Create a stored procedure for searching books (optional)
DELIMITER //
CREATE PROCEDURE SearchBooks(IN search_term VARCHAR(255))
BEGIN
    SELECT * FROM books 
    WHERE title LIKE CONCAT('%', search_term, '%') 
       OR author LIKE CONCAT('%', search_term, '%')
       OR description LIKE CONCAT('%', search_term, '%')
       OR category LIKE CONCAT('%', search_term, '%')
    ORDER BY title;
END //
DELIMITER ;

-- Display setup completion message
SELECT 'Book Manager database setup completed successfully!' as Message;
SELECT COUNT(*) as 'Total Books Inserted' FROM books;
SELECT DISTINCT category as 'Available Categories' FROM books ORDER BY category;