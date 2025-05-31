export interface User {
  id: number;
  name?: string;
  avatar?: string;
  email?: string;

  [key: string]: unknown;
}
