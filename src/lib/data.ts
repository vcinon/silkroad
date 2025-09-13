export type User = {
  id: string;
  username: string;
  password?: string; // Stored in-memory for this prototype. In production, use hashed passwords.
  enabled: boolean;
  role: 'user' | 'admin';
  expiresAt?: string; // ISO 8601 date string
};

type AppState = {
  isServiceEnabled: boolean;
  users: User[];
};

// In-memory store
const state: AppState = {
  isServiceEnabled: true,
  users: [
    { id: 'user123', username: 'alpha', enabled: true, role: 'user', expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString() },
    { id: 'user456', username: 'beta', enabled: false, role: 'user' },
    { id: 'admin-user', username: 'admin', enabled: true, role: 'admin' },
  ],
};

// --- Service Management ---
export const getServiceStatus = () => state.isServiceEnabled;
export const toggleServiceStatus = () => {
  state.isServiceEnabled = !state.isServiceEnabled;
  return state.isServiceEnabled;
};

// --- User Management ---
export const getUsers = () => state.users;
export const findUserById = (userId: string) => state.users.find(u => u.id === userId);
export const findUserByUsername = (username: string) => state.users.find(u => u.username === username);


export const addUser = (userData: Omit<User, 'id'>): User => {
    const newUser: User = {
        ...userData,
        id: `user${Date.now()}`,
    };
    state.users.push(newUser);
    return newUser;
};

export const updateUser = (userId: string, updates: Partial<Omit<User, 'id'>>) => {
  const userIndex = state.users.findIndex(u => u.id === userId);
  if (userIndex === -1) return null;

  state.users[userIndex] = { ...state.users[userIndex], ...updates };
  return state.users[userIndex];
};

export const deleteUser = (userId: string): boolean => {
    const userIndex = state.users.findIndex(u => u.id === userId);
    if (userIndex === -1) return false;

    state.users.splice(userIndex, 1);
    return true;
};
