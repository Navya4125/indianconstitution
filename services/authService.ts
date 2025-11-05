// services/authService.ts
import { User } from '../types';

const USERS_STORAGE_KEY = 'samvidhan_setu_users';
const CURRENT_USER_STORAGE_KEY = 'samvidhan_setu_current_user';

interface StoredUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string; // In a real app, this would be a hash
  role: 'user' | 'admin';
  notifications: string[];
}

const getStoredUsers = (): StoredUser[] => {
  const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

const saveUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
  return userJson ? JSON.parse(userJson) : null;
};

// New function to update the current user in localStorage and return the updated user
export const updateCurrentUserInStorage = (user: User): User => {
  localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
  return user;
};


export const login = async (username: string, password: string): Promise<User | null> => {
  const users = getStoredUsers();
  const foundUser = users.find(u => u.username === username && u.passwordHash === password); // Mock password check

  if (foundUser) {
    const user: User = {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
      role: foundUser.role,
      notifications: foundUser.notifications,
    };
    localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
    return user;
  }
  return null;
};

export const signup = async (username: string, email: string, password: string): Promise<User | null> => {
  const users = getStoredUsers();
  if (users.some(u => u.username === username || u.email === email)) {
    console.error('Username or email already exists.');
    return null;
  }

  const newUser: StoredUser = {
    id: `user-${Date.now()}`,
    username,
    email,
    passwordHash: password, // Mock, should be hashed in real app
    role: users.length === 0 ? 'admin' : 'user', // First user is admin
    notifications: ['Welcome to Samvidhan Setu!'],
  };
  users.push(newUser);
  saveUsers(users);

  const user: User = {
    id: newUser.id,
    username: newUser.username,
    email: newUser.email,
    role: newUser.role,
    notifications: newUser.notifications,
  };
  localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
  return user;
};

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
};

export const updateUserNotification = (userId: string, notification: string): User | null => {
  const users = getStoredUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex > -1) {
    users[userIndex].notifications.unshift(notification); // Add to the beginning
    saveUsers(users);
    // If the updated user is the current user, also update localStorage
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      const updatedCurrentUser: User = { ...currentUser, notifications: users[userIndex].notifications };
      localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(updatedCurrentUser));
      return updatedCurrentUser;
    }
  }
  return null;
};