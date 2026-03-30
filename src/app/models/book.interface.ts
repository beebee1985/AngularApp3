/**
 * Book interface that defines the structure of book data
 * Used across all components and services to ensure type safety
 */
export interface Book {
  id?: number;
  title: string;
  author: string;
  description: string;
  isbn: string;
  publishedDate: string;
  pages: number;
  category: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}
