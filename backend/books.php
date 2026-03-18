<?php
/**
 * Book Management API
 * PHP Backend for Angular Book Manager Application
 * Provides CRUD operations for book management with MySQL database
 * 
 * Author: MWD4B Student - Assignment 3
 * Date: March 2024
 */

// Enable CORS for Angular frontend
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database configuration
class Database {
    private $host = 'localhost';
    private $database_name = 'book_manager';
    private $username = 'root';
    private $password = '';
    private $connection;

    /**
     * Get database connection
     */
    public function getConnection() {
        $this->connection = null;
        
        try {
            $this->connection = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->database_name,
                $this->username,
                $this->password
            );
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->connection->exec("set names utf8");
        } catch(PDOException $exception) {
            error_log("Connection error: " . $exception->getMessage());
            return null;
        }
        
        return $this->connection;
    }
}

// Book class for handling book operations
class Book {
    private $connection;
    private $table = 'books';

    // Book properties
    public $id;
    public $title;
    public $author;
    public $description;
    public $isbn;
    public $published_date;
    public $pages;
    public $category;
    public $image_url;
    public $created_at;
    public $updated_at;

    /**
     * Constructor
     */
    public function __construct($db) {
        $this->connection = $db;
    }

    /**
     * Get all books
     */
    public function getAllBooks() {
        $query = "SELECT * FROM " . $this->table . " ORDER BY created_at DESC";
        $stmt = $this->connection->prepare($query);
        
        try {
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch(PDOException $exception) {
            error_log("Get all books error: " . $exception->getMessage());
            return false;
        }
    }

    /**
     * Get single book by ID
     */
    public function getBookById($id) {
        $query = "SELECT * FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':id', $id);
        
        try {
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch(PDOException $exception) {
            error_log("Get book by ID error: " . $exception->getMessage());
            return false;
        }
    }

    /**
     * Create new book
     */
    public function createBook($data) {
        $query = "INSERT INTO " . $this->table . " 
                  (title, author, description, isbn, published_date, pages, category, image_url, created_at, updated_at) 
                  VALUES 
                  (:title, :author, :description, :isbn, :published_date, :pages, :category, :image_url, NOW(), NOW())";
        
        $stmt = $this->connection->prepare($query);
        
        try {
            $stmt->execute([
                ':title' => $data['title'],
                ':author' => $data['author'],
                ':description' => $data['description'],
                ':isbn' => $data['isbn'],
                ':published_date' => $data['published_date'],
                ':pages' => $data['pages'],
                ':category' => $data['category'],
                ':image_url' => $data['image_url'] ?? null
            ]);
            
            return $this->connection->lastInsertId();
        } catch(PDOException $exception) {
            error_log("Create book error: " . $exception->getMessage());
            return false;
        }
    }

    /**
     * Update existing book
     */
    public function updateBook($id, $data) {
        $query = "UPDATE " . $this->table . " 
                  SET title = :title, 
                      author = :author, 
                      description = :description, 
                      isbn = :isbn, 
                      published_date = :published_date, 
                      pages = :pages, 
                      category = :category, 
                      image_url = :image_url, 
                      updated_at = NOW()
                  WHERE id = :id";
        
        $stmt = $this->connection->prepare($query);
        
        try {
            return $stmt->execute([
                ':id' => $id,
                ':title' => $data['title'],
                ':author' => $data['author'],
                ':description' => $data['description'],
                ':isbn' => $data['isbn'],
                ':published_date' => $data['published_date'],
                ':pages' => $data['pages'],
                ':category' => $data['category'],
                ':image_url' => $data['image_url'] ?? null
            ]);
        } catch(PDOException $exception) {
            error_log("Update book error: " . $exception->getMessage());
            return false;
        }
    }

    /**
     * Delete book
     */
    public function deleteBook($id) {
        $query = "DELETE FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':id', $id);
        
        try {
            return $stmt->execute();
        } catch(PDOException $exception) {
            error_log("Delete book error: " . $exception->getMessage());
            return false;
        }
    }
}

// Initialize database and book class
$database = new Database();
$db = $database->getConnection();

if ($db === null) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit();
}

$book = new Book($db);

// Handle different HTTP methods
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

try {
    switch ($method) {
        case 'GET':
            // Get book(s)
            if (isset($_GET['id'])) {
                $result = $book->getBookById($_GET['id']);
                if ($result) {
                    echo json_encode($result);
                } else {
                    http_response_code(404);
                    echo json_encode(['error' => 'Book not found']);
                }
            } else {
                $result = $book->getAllBooks();
                if ($result !== false) {
                    echo json_encode($result);
                } else {
                    http_response_code(500);
                    echo json_encode(['error' => 'Failed to retrieve books']);
                }
            }
            break;

        case 'POST':
            // Create new book
            if (!$input) {
                http_response_code(400);
                echo json_encode(['error' => 'Invalid input data']);
                break;
            }
            
            $result = $book->createBook($input);
            if ($result) {
                http_response_code(201);
                echo json_encode(['success' => true, 'id' => $result, 'message' => 'Book created successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to create book']);
            }
            break;

        case 'PUT':
            // Update book
            if (!$input || !isset($input['id'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Invalid input data or missing ID']);
                break;
            }
            
            $result = $book->updateBook($input['id'], $input);
            if ($result) {
                echo json_encode(['success' => true, 'message' => 'Book updated successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to update book']);
            }
            break;

        case 'DELETE':
            // Delete book
            if (!isset($_GET['id'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Book ID is required']);
                break;
            }
            
            $result = $book->deleteBook($_GET['id']);
            if ($result) {
                echo json_encode(['success' => true, 'message' => 'Book deleted successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to delete book']);
            }
            break;

        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    error_log("API error: " . $e->getMessage());
    echo json_encode(['error' => 'Internal server error']);
}
?>