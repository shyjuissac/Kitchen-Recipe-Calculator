import { useState, useEffect } from 'react';
import { User, AuthState, LoginCredentials } from '../types/Auth';

const DEMO_USERS = [
  {
    username: 'manager',
    password: 'manager123',
    role: 'manager' as const,
    name: 'Kitchen Manager'
  },
  {
    username: 'staff',
    password: 'staff123',
    role: 'kitchen-staff' as const,
    name: 'Kitchen Staff'
  }
];

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true
  });

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('auth-user');
    const sessionExpiry = localStorage.getItem('auth-expiry');
    
    if (savedUser && sessionExpiry) {
      const now = new Date().getTime();
      const expiry = parseInt(sessionExpiry);
      
      if (now < expiry) {
        const user = JSON.parse(savedUser);
        setAuthState({
          isAuthenticated: true,
          user,
          loading: false
        });
        return;
      } else {
        // Session expired
        localStorage.removeItem('auth-user');
        localStorage.removeItem('auth-expiry');
      }
    }
    
    setAuthState(prev => ({ ...prev, loading: false }));
  }, []);

  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    console.log('=== LOGIN ATTEMPT ===');
    console.log('Entered username:', `"${credentials.username}"`);
    console.log('Entered password:', `"${credentials.password}"`);
    console.log('Available users:', DEMO_USERS);
    
    // Simple string comparison
    const foundUser = DEMO_USERS.find(user => {
      const usernameMatch = user.username === credentials.username;
      const passwordMatch = user.password === credentials.password;
      console.log(`Checking user ${user.username}: username match = ${usernameMatch}, password match = ${passwordMatch}`);
      return usernameMatch && passwordMatch;
    });
    
    console.log('Found user:', foundUser);
    
    if (foundUser) {
      const user: User = {
        id: foundUser.username,
        username: foundUser.username,
        role: foundUser.role,
        name: foundUser.name,
        createdAt: new Date(),
        lastLogin: new Date()
      };
      
      // Set session expiry to 8 hours
      const expiry = new Date().getTime() + (8 * 60 * 60 * 1000);
      
      localStorage.setItem('auth-user', JSON.stringify(user));
      localStorage.setItem('auth-expiry', expiry.toString());
      
      setAuthState({
        isAuthenticated: true,
        user,
        loading: false
      });
      
      console.log('Login successful!');
      return { success: true };
    } else {
      console.log('Login failed - no matching user found');
      setAuthState(prev => ({ ...prev, loading: false }));
      return { success: false, error: 'Invalid username or password' };
    }
  };

  const logout = () => {
    localStorage.removeItem('auth-user');
    localStorage.removeItem('auth-expiry');
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false
    });
  };

  const isManager = () => {
    return authState.user?.role === 'manager';
  };

  const isKitchenStaff = () => {
    return authState.user?.role === 'kitchen-staff';
  };

  return {
    ...authState,
    login,
    logout,
    isManager,
    isKitchenStaff
  };
}