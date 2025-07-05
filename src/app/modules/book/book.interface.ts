import { Model } from 'mongoose';

export interface IBook {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

export interface IBookMethods {
  borrowBook(quantity: number): Promise<void>;
}

export interface BookModel extends Model<IBook, {}, IBookMethods> {
  getAvailableBooks(): Promise<IBook[]>;
}
