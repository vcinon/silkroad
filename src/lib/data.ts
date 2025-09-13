import { supabase } from './supabase';

export type User = {
  id: string;
  username: string;
  password?: string;
  enabled: boolean;
  role: 'user' | 'admin';
  expires_at?: string; // ISO 8601 date string
  expiresAt?: string; // Keep this for compatibility with the form
};

type AppState = {
  isServiceEnabled: boolean;
};

// In-memory store for service status only
const state: AppState = {
  isServiceEnabled: true,
};

// --- Service Management ---
export const getServiceStatus = () => state.isServiceEnabled;
export const toggleServiceStatus = () => {
  state.isServiceEnabled = !state.isServiceEnabled;
  return state.isServiceEnabled;
};

// --- User Management (Supabase) ---
const fromUser = (user: any): User => {
  if (!user) return user;
  const { expires_at, ...rest } = user;
  return {
    ...rest,
    expiresAt: expires_at,
  };
};

export const getUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase.from('users').select('*').order('username', { ascending: true });
  if (error) {
    console.error('Error fetching users:', error);
    return [];
  }
  return data.map(fromUser);
};

export const findUserById = async (userId: string): Promise<User | null> => {
  const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();
  if (error) {
    // .single() throws an error if no row is found, which is expected.
    if (error.code !== 'PGRST116') {
        console.error('Error finding user by ID:', error);
    }
    return null;
  }
  return fromUser(data);
};

export const findUserByUsername = async (username: string): Promise<User | null> => {
    const { data, error } = await supabase.from('users').select('*').eq('username', username).single();
    if (error) {
        if (error.code !== 'PGRST116') {
            console.error('Error finding user by username:', error);
        }
        return null;
    }
    return fromUser(data);
};

export const addUser = async (userData: Omit<User, 'id'>): Promise<User | null> => {
    const { data, error } = await supabase
      .from('users')
      .insert([
        { 
          username: userData.username,
          password: userData.password,
          role: userData.role,
          enabled: userData.enabled,
          expires_at: userData.expiresAt,
        },
      ])
      .select()
      .single();

    if (error) {
        console.error('Error adding user:', error);
        return null;
    }
    return fromUser(data);
};

export const updateUser = async (userId: string, updates: Partial<Omit<User, 'id'>>): Promise<User | null> => {
  const { expiresAt, ...rest } = updates;
  const dbUpdates: any = { ...rest };
  if (expiresAt !== undefined) {
    dbUpdates.expires_at = expiresAt;
  }

  const { data, error } = await supabase
    .from('users')
    .update(dbUpdates)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating user:', error);
    return null;
  }
  return fromUser(data);
};

export const deleteUser = async (userId: string): Promise<boolean> => {
  const { error } = await supabase.from('users').delete().eq('id', userId);
  if (error) {
    console.error('Error deleting user:', error);
    return false;
  }
  return true;
};
