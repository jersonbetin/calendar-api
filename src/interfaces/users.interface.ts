export interface User {
  id?: string;
  email: string;
  password: string;
}

export interface UserWithoutPassword {
  id?: string;
  email: string;
}
