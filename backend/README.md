# Book Manager Backend API

This is the PHP/MySQL backend for the AngularApp3 Book Manager application.

## Setup Instructions

### Prerequisites

- **XAMPP** (or similar) with Apache and MySQL installed
- PHP 7.4 or higher
- MySQL 5.7 or higher

### Installation Steps

1. **Start XAMPP**
   - Start Apache and MySQL from the XAMPP Control Panel

2. **Create Database**
   - Open phpMyAdmin at http://localhost/phpmyadmin
   - Import the `database_schema.sql` file to create the database and tables
   - Or run the SQL file manually in your MySQL client

3. **Configure Database Connection**
   - Edit `config.php` if your database credentials differ:
     ```php
     $host = 'localhost';
     $db   = 'book_manager';
     $user = 'root';
     $pass = '';  // Update if you have a password
     ```

4. **Copy Backend Files to htdocs**
   - Copy this entire `backend` folder to your XAMPP's `htdocs` directory
   - Path should be: `C:\xampp\htdocs\book-api\`
   - Or create a symbolic link

5. **Update Angular API URL**
   - In your Angular services (`book.ts` and `auth.ts`), ensure the API URL matches:
     ```typescript
     private apiUrl = 'http://localhost/book-api';
     ```

## API Endpoints

### Books API (`books.php`)

- **GET** `/books.php` - Get all books
- **GET** `/books.php?id={id}` - Get single book by ID
- **POST** `/books.php` - Create new book
- **PUT** `/books.php` - Update book
- **DELETE** `/books.php?id={id}` - Delete book

### Authentication API

- **POST** `/register.php` - Register new user

  ```json
  {
    "username": "user123",
    "password": "password123"
  }
  ```

- **POST** `/login.php` - Login user
  ```json
  {
    "username": "user123",
    "password": "password123"
  }
  ```

## Testing

### Test with cURL

```bash
# Get all books
curl http://localhost/book-api/books.php

# Register a user
curl -X POST http://localhost/book-api/register.php \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123"}'

# Login
curl -X POST http://localhost/book-api/login.php \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123"}'
```

## Sample Data

The `database_schema.sql` includes:

- 3 sample books
- 1 demo user (username: `demo`, password: `password123`)

## Security Notes

- Passwords are hashed using PHP's `password_hash()` function
- CORS is enabled for development (restrict in production)
- Input validation is implemented for all endpoints
- Prepared statements are used to prevent SQL injection

## Troubleshooting

1. **CORS errors**: Make sure CORS headers are enabled in `config.php`
2. **Database connection failed**: Check MySQL is running and credentials are correct
3. **404 errors**: Verify the backend files are in the correct htdocs directory
4. **Angular can't connect**: Check the API URL in your Angular services matches the backend location

## Assignment Requirements

This backend implements:

- ✅ PHP + MySQL backend
- ✅ CRUD operations for books (Create, Read, Update, Delete)
- ✅ User registration endpoint
- ✅ User login endpoint
- ✅ RESTful API design
- ✅ JSON responses
- ✅ Error handling
- ✅ Input validation
- ✅ Secure password storage
