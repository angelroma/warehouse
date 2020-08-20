export interface Category {
  key: number
  name: string
  description: string
  createdOn: string
}

export interface CategoryResponse {
  id: number
  name: string
  description: string
  createdOn: string,
 
}

export interface CategoryRequest {
  id: number
  name: string
  description: string
  createdOn: string,
}