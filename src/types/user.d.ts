interface User {
  id: number;
  name?: string;
  avatar?: string;
  email?: string;
  role: Role;

  [key: string]: unknown;
}

interface UserInfo {
  id: number;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  email?: string;
  role: Role;

  [key: string]: unknown;
}