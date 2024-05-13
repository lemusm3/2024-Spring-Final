import data from "../data/users.json"
import { api } from "./myFetch";

export interface User {
    id: number
    firstName: string
    lastName: string
    handle: string
    email: string   
    admin: boolean 
    image: string
  }
export function getUsers(): User[] {
    return data.items.map(item => ({ ...item, id: 0 }));
  }
  export async function searchUser(term: string){
    const data=await api<User[]>(`users/search?q=${term}`);
    return data ? data.data : [];
  }
  
  