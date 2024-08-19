import { IdObj } from "./IdObj";

export type Book = {
  _id: IdObj;
  title: string;
  author: string;
  ISBN: string;
  genre: string;
  published: number;
  pages: number;
  image: string;
  description?: string;
};

export type FormBookType = {
  _id?: IdObj;
  title: string;
  author: string;
  ISBN: string;
  genre: string;
  published: number;
  pages: number;
  image: string;
  description?: string;
};
