
// Simple authentication utility for Tave Coin dashboard
export interface User {
  email: string;
  name: string;
}

// Valid credentials
const VALID_EMAIL = "Bogdan@tave.com";
const VALID_PASSWORD = "Taveowner";

// Local storage key
const AUTH_TOKEN_KEY = "tave_auth_token";
const USER_DATA_KEY = "tave_user_data";

// Login function
export const login = (email: string, password: string): boolean => {
  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    // Generate a simple token
    const token = btoa(`${email}:${Date.now()}`);
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify({
      email,
      name: "Bogdan"
    }));
    return true;
  }
  return false;
};

// Logout function
export const logout = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return localStorage.getItem(AUTH_TOKEN_KEY) !== null;
};

// Get current user
export const getCurrentUser = (): User | null => {
  const userData = localStorage.getItem(USER_DATA_KEY);
  if (userData) {
    return JSON.parse(userData) as User;
  }
  return null;
};
