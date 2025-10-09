export type Recipe = {
  id: string
  name: string
  image?: string | null
  ingredients: string
  price: number
  quantity?: number
  createdAt?: string | Date
  updatedAt?: string | Date
}