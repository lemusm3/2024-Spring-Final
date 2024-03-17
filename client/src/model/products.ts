import data from "../data/products.json"

export interface ActivityData {
    email: string   
    location: string
    distance: number
    duration: number
    date: string
    image: string
    comment: string
  }
export function getActivity(): ActivityData[] {
    return data.items;
  }