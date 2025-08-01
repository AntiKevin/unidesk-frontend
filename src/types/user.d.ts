interface User {
  id: number;
  name?: string;
  avatar?: string;
  email?: string;
  role: Role;

  [key: string]: unknown;
}
