# Book Manager - Angular & PHP Application

## MWD4B (Angular) - Assignment 4

**Course:** Angular Development  
**Textbook:** Learning Angular: A Practical Guide to Building Web Applications with Modern Angular (5th Edition) by Aristeidis Bampakos  
**Student:** [Your Name]  
**Date:** March 30, 2026

---

## 📚 Project Overview

A full-stack book management application built with Angular frontend and PHP/MySQL backend. This application demonstrates mastery of:

- ✅ **Angular Forms** with template-driven validation
- ✅ **HTTP Client** for sending/receiving data
- ✅ **Angular Routing** for navigation
- ✅ **PHP REST API** with MySQL database
- ✅ **CRUD Operations** (Create, Read, Update, Delete)
- ✅ **TypeScript** best practices
- ✅ **Responsive Design** with modern UI/UX

---

## 🎯 Assignment Requirements Met

### ✅ Main Tasks Completed

1. **Extended Assignment #3 project** from GitHub repository
2. **PHP + MySQL Backend Integration:**
   - XAMPP server configuration
   - MySQL database with books table
   - Sample data populated
3. **BookService Implementation:**
   - Angular HttpClient integration
   - Full CRUD operations:
     - ✅ **Create** - Add new books via form
     - ✅ **Read** - Retrieve and display all books
     - ✅ **Update** - Modify book information
     - ✅ **Delete** - Remove books with confirmation
4. **Routing Configuration:**
   - ✅ `/list` → Display all books (BookListComponent)
   - ✅ `/add` → Form to add new book (AddBookComponent)
   - ✅ `/delete` → Delete functionality integrated in list view
   - ✅ Default route redirects to `/list`
5. **Code Quality:**
   - ✅ Comprehensive comments throughout all files
   - ✅ TypeScript interfaces for type safety
   - ✅ Error handling and loading states
   - ✅ Form validation

---

## 🏗️ Architecture

### Frontend (Angular)

- **Components:**
  - `AppComponent` - Main application shell with navigation
  - `BookListComponent` - Displays books grid with delete functionality
  - `AddBookComponent` - Form for adding new books with validation
- **Services:**
  - `BookService` - HTTP communication with PHP backend
- **Models:**
  - `Book` interface - Type-safe book data structure
- **Routing:**
  - `/` → Redirects to `/list`
  - `/list` → Book library view
  - `/add` → Add new book form
  - `/**` → Wildcard redirects to `/list`

### Backend (PHP/MySQL)

- **API Endpoints:**
  - `GET /books.php` → Get all books
  - `GET /books.php?id={id}` → Get single book
  - `POST /books.php` → Create new book
  - `PUT /books.php` → Update existing book
  - `DELETE /books.php?id={id}` → Delete book
- **Database:**
  - Table: `books` with 11 fields
  - Indexes for performance optimization
  - Sample data includes 10 books
  - Stored procedure for search functionality

---

## 🛠️ Prerequisites

### Required Software

1. **XAMPP** (Apache, MySQL, PHP)
   - Download from: https://www.apachefriends.org/
   - Start Apache and MySQL services
2. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
3. **Angular CLI** (v17 or higher)
   ```bash
   npm install -g @angular/cli
   ```
4. **Git** (for version control)
   - Download from: https://git-scm.com/

- **Git** for version control

### Recommended Tools

- **Visual Studio Code**
- **Postman** (for API testing)
- **phpMyAdmin** (included with XAMPP)

---

## 📥 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/[your-username]/AngularApp3.git
cd AngularApp3
```

### Step 2: Backend Setup (XAMPP/PHP/MySQL)

#### A. Start XAMPP Services

1. Open **XAMPP Control Panel**
2. Click **Start** for **Apache** web server
3. Click **Start** for **MySQL** database server

#### B. Import Database

1. Open **phpMyAdmin**: http://localhost/phpmyadmin
2. Click **Import** tab
3. Click **Choose File** and select: `backend/book_manager_database.sql`
4. Click **Go** to execute the SQL script
5. Verify database `book_manager` is created with 10 sample books

#### C. Configure PHP Backend

1. **Copy backend folder** to XAMPP htdocs directory:

   **Windows:**

   ```bash
   xcopy backend C:\xampp\htdocs\book-api\ /E /I
   ```

   **macOS/Linux:**

   ```bash
   cp -r backend /Applications/XAMPP/htdocs/book-api
   ```

2. **Update database credentials** (if needed) in `backend/config.php`:

   ```php
   $host = 'localhost';
   $database_name = 'book_manager';
   $username = 'root';
   $password = ''; // Default is empty for XAMPP
   ```

3. **Test the API** by visiting: http://localhost/book-api/books.php
   - Should display JSON array of books

### Step 3: Frontend Setup (Angular)

```bash
# Install Node.js dependencies
npm install

# Start Angular development server
ng serve

# Application runs at: http://localhost:4200
```

### Step 4: Verify Everything Works

1. **Open Browser**: http://localhost:4200
2. **Navigate to Library**: Click "📋 Library" (should display books)
3. **Add a Book**: Click "➕ Add Book" and fill the form
4. **Delete a Book**: Click "🗑️ Delete" button on any book

---

## 🚀 Usage Guide

### Accessing the Application

- **Home Page**: http://localhost:4200 (redirects to /list)
- **Book Library**: http://localhost:4200/list
- **Add New Book**: http://localhost:4200/add

### Features Demonstration

#### 📋 View Books (/list)

- Displays all books in a responsive card grid
- Shows book cover images
- Displays: title, author, category, pages, ISBN, published date
- Includes description for each book
- Provides delete functionality with confirmation dialog
- Refresh button to reload data from server

#### ➕ Add New Book (/add)

- **Form Fields:**
  - Title\* (required)
  - Author\* (required)
  - Description\* (required)
  - ISBN\* (required, validated format)
  - Category\* (dropdown with 18 options)
  - Pages\* (number, minimum 1)
  - Published Date (optional)
  - Cover Image URL (optional, with placeholder generator)

- **Validation:**
  - All required fields marked with \*
  - Real-time validation feedback
  - ISBN format checking (10 or 13 digits)
  - Submit button disabled until form is valid

- **Additional Features:**
  - Live preview of book information
  - Generate placeholder image button
  - Reset form button
  - Auto-navigation to library after successful submission
  - Success/error message display

#### 🗑️ Delete Book

- Available on each book card in the library
- Confirmation dialog before deletion
- Removes book from database
- Updates UI immediately
- Error handling if deletion fails

---

## 🗄️ Database Schema

### Books Table Structure

```sql
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

    -- Indexes for performance
    INDEX idx_title (title),
    INDEX idx_author (author),
    INDEX idx_category (category)
);
```

### Sample Data

The database includes 10 sample books covering various categories:

- Learning Angular (Aristeidis Bampakos)
- TypeScript in 50 Lessons
- Angular: Up and Running
- Pro Angular 6
- RxJS in Action
- JavaScript: The Good Parts
- Clean Code
- Angular Security
- Testing Angular Applications
- Node.js Design Patterns

---

## 📁 Project Structure

```
AngularApp3/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── book-list/
│   │   │   └── add-book/
│   │   ├── models/
│   │   │   └── book.interface.ts
│   │   ├── services/
│   │   │   └── book.ts
│   │   ├── app.routes.ts
│   │   ├── app.config.ts
│   │   └── app.ts
│   └── styles.css
├── backend/
│   ├── books.php
│   ├── config.php
│   └── book_manager_database.sql
├── package.json
├── angular.json
└── README.md
```

---

## 📚 Technologies Used

### Frontend Stack

- **Angular 17** - Modern web application framework
- **TypeScript 5** - Strongly-typed programming language
- **RxJS** - Reactive Extensions for JavaScript
- **Angular Router** - Client-side navigation
- **Angular HttpClient** - HTTP communication
- **FormsModule** - Template-driven forms
- **CSS3** - Modern styling with flexbox and grid

### Backend Stack

- **PHP 8** - Server-side scripting language
- **MySQL 8** - Relational database management
- **Apache** - Web server (via XAMPP)
- **PDO** - PHP Data Objects for database access
- **REST API** - RESTful service architecture

### Development Tools

- **Angular CLI v17** - Command-line interface
- **npm** - Node package manager
- **Git** - Version control system
- **XAMPP** - Cross-platform web server solution
- **VS Code** - Code editor
- **phpMyAdmin** - MySQL database administration

---

## 📁 Project Structure

```
AngularApp3/
├── backend/                          # PHP Backend
│   ├── books.php                     # REST API endpoints
│   ├── config.php                    # Database configuration
│   └── book_manager_database.sql     # Database schema & data
│
├── src/                              # Angular source code
│   ├── app/
│   │   ├── components/
│   │   │   ├── book-list/           # Book list component
│   │   │   │   ├── book-list.ts
│   │   │   │   ├── book-list.html
│   │   │   │   ├── book-list.css
│   │   │   │   └── book-list.spec.ts
│   │   │   └── add-book/            # Add book component
│   │   │       ├── add-book.ts
│   │   │       ├── add-book.html
│   │   │       ├── add-book.css
│   │   │       └── add-book.spec.ts
│   │   │
│   │   ├── models/
│   │   │   └── book.interface.ts    # TypeScript interface
│   │   │
│   │   ├── services/
│   │   │   ├── book.ts              # HTTP service
│   │   │   └── book.spec.ts
│   │   │
│   │   ├── app.config.ts            # App configuration
│   │   ├── app.routes.ts            # Route definitions
│   │   ├── app.ts                   # Root component
│   │   ├── app.html                 # Root template
│   │   └── app.css                  # Root styles
│   │
│   ├── index.html                   # Main HTML file
│   ├── main.ts                      # Application entry point
│   └── styles.css                   # Global styles
│
├── angular.json                     # Angular configuration
├── package.json                     # npm dependencies
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # This file

```

---

## 🎓 Assignment Submission Checklist

### ✅ Required Deliverables

- [x] **GitHub Repository Link**
  - All code pushed to GitHub
  - Repository name: AngularApp3
  - Branches: main (or master)
- [x] **Exported SQL Database File**
  - File: `backend/book_manager_database.sql`
  - Includes CREATE DATABASE
  - Includes CREATE TABLE
  - Includes sample data (10 books)
  - Includes indexes and stored procedures

- [x] **Implementation Requirements**
  - BookService using Angular HttpClient ✅
  - CRUD Operations (Create, Read, Update, Delete) ✅
  - Route: /list (BookListComponent) ✅
  - Route: /add (AddBookComponent) ✅
  - Delete functionality ✅
  - Well-commented code ✅

### 📤 How to Submit

1. **Push to GitHub:**

   ```bash
   git add .
   git commit -m "Assignment 4: Complete Book Manager with CRUD operations"
   git push origin main
   ```

2. **Export Database:**
   - Already included in `backend/book_manager_database.sql`
   - Can also export from phpMyAdmin:
     - Select `book_manager` database
     - Click "Export" tab
     - Choose "Quick" export method
     - Format: SQL
     - Click "Go"

3. **Submit to Instructor:**
   - GitHub repository URL: `https://github.com/[your-username]/AngularApp3`
   - SQL file: `backend/book_manager_database.sql` (included in repo)

---

## 🧪 Testing the Application

### Manual Testing Checklist

#### Backend API Testing

```bash
# Test GET all books
curl http://localhost/book-api/books.php

# Test GET single book
curl http://localhost/book-api/books.php?id=1

# Test POST (create book)
curl -X POST http://localhost/book-api/books.php \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Book","author":"Test Author","description":"Test Desc","isbn":"978-1234567890","pages":100,"category":"Test"}'

# Test DELETE
curl -X DELETE http://localhost/book-api/books.php?id=1
```

#### Frontend Testing

1. **Navigation Tests:**
   - Click on "📋 Library" - should load /list
   - Click on "➕ Add Book" - should load /add
   - Navigate to `/unknown-route` - should redirect to /list

2. **Book List Tests:**
   - Verify all books display correctly
   - Check that images load
   - Click refresh button
   - Delete a book and confirm removal

3. **Add Book Tests:**
   - Submit empty form - should show validation errors
   - Fill all required fields - submit button should enable
   - Add valid book - should redirect to list
   - Verify new book appears in library

4. **Error Handling:**
   - Stop XAMPP MySQL - should show error message
   - Stop XAMPP Apache - should display sample data

---

## 🔧 Troubleshooting

### Common Issues & Solutions

#### 1. "Cannot connect to backend"

**Problem:** Angular can't reach PHP API

**Solutions:**

- Verify XAMPP Apache is running
- Verify XAMPP MySQL is running
- Check API URL in `src/app/services/book.ts` (line 14)
- Ensure backend folder is in `C:\xampp\htdocs\book-api\`
- Test API directly: http://localhost/book-api/books.php

#### 2. "Database connection failed"

**Problem:** PHP can't connect to MySQL

**Solutions:**

- Check MySQL is running in XAMPP
- Verify database credentials in `backend/config.php`
- Confirm database `book_manager` exists in phpMyAdmin
- Check if port 3306 is available

#### 3. "CORS Error" in browser console

**Problem:** Cross-Origin Resource Sharing blocked

**Solutions:**

- Verify CORS headers in `backend/books.php` (lines 9-12)
- Change Angular URL to match: `http://localhost:4200`
- Clear browser cache

#### 4. "Module not found" in Angular

**Problem:** Missing npm dependencies

**Solutions:**

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 5. Port 4200 already in use

**Problem:** Another Angular app running

**Solutions:**

```bash
# Use different port
ng serve --port 4300

# Or stop other Angular apps
# Then restart
ng serve
```

---

## 📖 Code Documentation

### Key Files Explained

#### `src/app/services/book.ts`

- Injects HttpClient for HTTP requests
- Defines API URL (http://localhost/book-api)
- Methods: getAllBooks(), addBook(), deleteBook(), updateBook()
- Error handling with catchError operator

#### `src/app/components/book-list/book-list.ts`

- Implements OnInit lifecycle hook
- Loads books on component initialization
- Handles delete operations with confirmation
- Falls back to sample data if backend unavailable

#### `src/app/components/add-book/add-book.ts`

- Template-driven form with ngModel
- Form validation (required fields, ISBN format)
- Generates placeholder images
- Navigates to list after successful submission

#### `backend/books.php`

- Handles GET, POST, PUT, DELETE requests
- Uses PDO for database operations
- Returns JSON responses
- Implements error logging

---

## 📚 Learning Outcomes Demonstrated

### From "Learning Angular (5th Edition)"

✅ **Chapter 4-5: Components & Templates**

- Created reusable components
- Used Angular directives (*ngIf, *ngFor)
- Implemented data binding

✅ **Chapter 6: Forms**

- Template-driven forms with FormsModule
- Form validation (required, pattern, min)
- Two-way data binding with [(ngModel)]

✅ **Chapter 8: Routing**

- Configured routing module
- Implemented navigation
- RouterLink and RouterOutlet usage
- Redirect routes

✅ **Chapter 9: HTTP & Observables**

- HttpClient for API calls
- RxJS Observables
- Error handling with catchError
- Subscribe pattern

✅ **TypeScript Best Practices**

- Interfaces for type safety
- Access modifiers (public, private)
- Type annotations
- Arrow functions

---

## 🌟 Additional Features

### Bonus Implementations

1. **Responsive Design**
   - Mobile-friendly card grid layout
   - Adaptive navigation
   - Touch-friendly buttons

2. **User Experience**
   - Loading states with spinners
   - Success/error messages
   - Confirmation dialogs
   - Form preview

3. **Code Quality**
   - Comprehensive JSDoc comments
   - TypeScript strict mode
   - Error boundaries
   - Consistent naming conventions

4. **Database Optimizations**
   - Indexed columns for faster queries
   - Stored procedures for complex operations
   - UTF-8 character encoding
   - Created/updated timestamps

---

## 📞 Support & Contact

**Student:** [Your Name]  
**Email:** [your.email@example.com]  
**Course:** MWD4B - Angular Development  
**Assignment:** Assignment 4  
**Date:** March 30, 2026

---

## 📄 License

This project is created for educational purposes as part of the MWD4B Angular Development course.

---

## 🙏 Acknowledgments

- **Textbook:** Learning Angular (5th Edition) by Aristeidis Bampakos
- **Framework:** Angular Team at Google
- **Community:** Stack Overflow, Angular Discord
- **Instructor:** [Instructor Name]

---

**© 2026 - MWD4B Angular Assignment 4 - Book Manager Application**

---

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
