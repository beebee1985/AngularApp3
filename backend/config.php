<?php
/**
 * Database Configuration for Book Manager API
 * MWD4B Angular Assignment 3
 */

// Database configuration constants
define('DB_HOST', 'localhost');
define('DB_NAME', 'book_manager');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

// API configuration
define('API_BASE_URL', 'http://localhost/book-api');
define('FRONTEND_URL', 'http://localhost:4200');

// Error reporting for development (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Log file for API errors
define('LOG_FILE', __DIR__ . '/logs/api_errors.log');

/**
 * Database connection function
 */
function getDatabaseConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]);
        
        return $pdo;
    } catch (PDOException $e) {
        logError("Database connection failed: " . $e->getMessage());
        return null;
    }
}

/**
 * Log error messages
 */
function logError($message) {
    $timestamp = date('Y-m-d H:i:s');
    $logMessage = "[$timestamp] $message" . PHP_EOL;
    
    // Create logs directory if it doesn't exist
    $logDir = dirname(LOG_FILE);
    if (!is_dir($logDir)) {
        mkdir($logDir, 0777, true);
    }
    
    error_log($logMessage, 3, LOG_FILE);
}

/**
 * Send JSON response
 */
function sendResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit();
}

/**
 * Set CORS headers
 */
function setCorsHeaders() {
    header('Access-Control-Allow-Origin: ' . FRONTEND_URL);
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Max-Age: 86400'); // 24 hours
}
?>