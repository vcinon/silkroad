export type User = {
  id: string;
  enabled: boolean;
  role: 'user' | 'admin';
};

type AppState = {
  isServiceEnabled: boolean;
  users: User[];
};

// In-memory store
const state: AppState = {
  isServiceEnabled: true,
  users: [
    { id: 'user123', enabled: true, role: 'user' },
    { id: 'user456', enabled: false, role: 'user' },
    { id: 'admin-user', enabled: true, role: 'admin' },
    { id: 'demoted-admin', enabled: true, role: 'user' },
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

export const updateUser = (userId: string, updates: Partial<Omit<User, 'id'>>) => {
  const userIndex = state.users.findIndex(u => u.id === userId);
  if (userIndex === -1) return null;

  state.users[userIndex] = { ...state.users[userIndex], ...updates };
  return state.users[userIndex];
};
