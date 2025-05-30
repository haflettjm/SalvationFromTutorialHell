import bcrypt from 'bcrypt';

export interface User {
  id: string; // or number, depending on your DB
  username: string;
  hashedPassword: string;
  createdAt: string;
}

export const users = [
  {
    id: 'u1',
    username: 'alice',
    hashedPassword: '$2a$10$abc123hashed', // placeholder, not real hash
    createdAt: '2024-01-01T12:00:00Z'
  },
  {
    id: 'u2',
    username: 'bob',
    hashedPassword: '$2a$10$def456hashed',
    createdAt: '2024-01-05T15:30:00Z'
  }
]

function checkPass(pass: string, passHash: string): boolean {
  const isValid = await bcrypt.compare(pass, passHash)
  return isValid
}

function hashPassword(pass:string): string{
  const passHash = await bcrypt.hash(pass)
  return passHash
}

export function useUser() {
  const user = useState<User | null>('user', () => null);
  const login = async () => { ... }
  const logout = async (...) => { ... }
  const createUser = async (...) => {...}
  const UpdateUser = async (...) => {...}
  const DeleteUser = async (...) => {...}
  return { user, login, logout, createUser, UpdateUser, DeleteUser };
}
