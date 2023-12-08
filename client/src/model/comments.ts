import { api } from "./session"

export interface Comment {
  id: number;
  content: string;
  date: string;
  userID: number;
  postID: number;
}

export function getProducts(): Promise<Comment[]> {
  return api('comments');
}