export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Cat {
  id: number;
  name: string;
  size: string;
  age: number;
}

export interface CatFormData {
  name: string;
  size: string;
  age: string;
}
