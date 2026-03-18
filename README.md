# Book Manager - Angular & PHP Application

## MWD4B (Angular) - Assignment 3

**Course:** Angular Development  
**Student:** [Your Name]  
**Date:** March 2024

---

## 📚 Project Overview

A comprehensive book management application built with Angular frontend and PHP/MySQL backend. This application demonstrates:

- **Angular Framework** with TypeScript
- **HTTP Services** for API communication
- **Angular Routing** for navigation
- **PHP REST API** with MySQL database
- **CRUD Operations** (Create, Read, Update, Delete)
- **Responsive Design** with modern UI/UX

---

## 🏗️ Architecture

### Frontend (Angular)
- **Components:** BookList, AddBook, App
- **Services:** BookService (HTTP Client)
- **Models:** Book interface
- **Routing:** /list and /add routes
- **Styling:** CSS with responsive design

### Backend (PHP/MySQL)
- **API:** RESTful PHP endpoints
- **Database:** MySQL with optimized schema
- **CORS:** Configured for Angular frontend
- **Error Handling:** Comprehensive logging

---

## 🛠️ Prerequisites

### Software Requirements
- **XAMPP** (Apache, MySQL, PHP)
- **Node.js** (v18 or higher)
- **Angular CLI** (v17 or higher)
- **Modern Web Browser**
- **Git** for version control

### Recommended Tools
- **Visual Studio Code**
- **Postman** (for API testing)
- **phpMyAdmin** (included with XAMPP)

---

## 📥 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/[username]/AngularApp3.git
cd AngularApp3
```

### 2. Frontend Setup (Angular)
```bash
# Install dependencies
npm install

# Start development server
ng serve

# Application will be available at: http://localhost:4200
```

### 3. Backend Setup (XAMPP/PHP)

#### A. Start XAMPP Services
1. Open **XAMPP Control Panel**
2. Start **Apache** web server
3. Start **MySQL** database server

#### B. Database Setup
1. Open **phpMyAdmin** (http://localhost/phpmyadmin)
2. Import the database script:
   - Click **Import** tab
   - Choose file: `backend/book_manager_database.sql`
   - Click **Go** to execute

#### C. API Setup
1. Copy the backend folder to XAMPP htdocs:
   ```bash
   # Copy backend files to XAMPP
   cp -r backend /xampp/htdocs/book-api
   ```

2. Verify API is working:
   - Visit: http://localhost/book-api/books.php
   - Should return JSON list of books

---

## 🚀 Usage

### Running the Application

1. **Start XAMPP** (Apache + MySQL)
2. **Start Angular**: `ng serve`
3. **Open Browser**: http://localhost:4200

### Application Features

#### 📋 Book Library (/list)
- View all books in a responsive grid layout
- See book details: title, author, category, pages, etc.
- Delete books with confirmation
- Navigate to add new books
- Refresh book list

#### ➕ Add New Book (/add)
- Comprehensive form with validation
- Required fields: title, author, description, ISBN, category, pages
- Optional fields: publication date, cover image URL
- Live preview of book information
- Form reset functionality  
- Auto-navigation after successful submission

---

## 🗄️ Database Schema

### Books Table
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

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

### Frontend
- **Angular 17** - Web application framework
- **TypeScript** - Programming language
- **RxJS** - Reactive programming
- **CSS3** - Styling and layout
- **HTML5** - Markup structure

### Backend
- **PHP 8** - Server-side scripting
- **MySQL 8** - Database management
- **Apache** - Web server
- **REST API** - Service architecture

### Development Tools
- **Angular CLI** - Development tooling
- **npm** - Package management
- **Git** - Version control
- **XAMPP** - Local development environment

---

**© 2024 - MWD4B Angular Assignment 3 - Book Manager Application**

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
