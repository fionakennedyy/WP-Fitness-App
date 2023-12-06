import { api } from "./session"

export interface Activity {
  id: number;
  title: string;
  description: string;
  type: string;
  duration: string;
  date: string;
  userID: number;
  images: string[];
}

export function getProducts(): Promise<Activity[]> {
  return api('activities');
}