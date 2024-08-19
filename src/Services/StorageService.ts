import { Book } from "../types/Book";

class StorageService {
  static getItem(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  static getBooks(key: string) {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as Book[]) : [];
  }

  static setItem(key: string, value: any) {
    const item = JSON.stringify(value);
    localStorage.setItem(key, item);
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
  }
}

export default StorageService;
