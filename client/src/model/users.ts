import data from "../data/users.json"

export interface UserRoot {
    firstName: string
    lastName: string
    handle: string
    email: string   
    admin: boolean 
    image: string
  }
export function getUsers(): UserRoot[] {
    return data.items;
  }
  