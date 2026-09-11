import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, AuthState, LoginCredentials, RegisterData, ApiResponse } from '@/types';
import { api } from '@/lib/api';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'laptoprent_token';
const USER_KEY = 'laptoprent_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      const userStr = localStorage.getItem(USER_KEY);

      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setState({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
          await refreshUser();
        } catch {
          clearAuth();
        }
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    initAuth();
  }, []);

  const refreshUser = useCallback(async () => {
    if (!state.token) return;
    try {
      const response = await api.get<ApiResponse<User>>('/auth/me');
      if (response.data.success && response.data.data) {
        const user = response.data.data;
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        setState(prev => ({ ...prev, user }));
      }
    } catch {
      clearAuth();
    }
  }, [state.token]);

  const clearAuth = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    delete api.defaults.headers.common['Authorization'];
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const login = async (credentials: LoginCredentials) => {
    const response = await api.post<ApiResponse<{ user: User; token: string }>>('/auth/login', credentials);
    if (response.data.success && response.data.data) {
      const { user, token } = response.data.data;
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      throw new Error(response.data.error?.message || 'Login failed');
    }
  };

  const register = async (data: RegisterData) => {
    const response = await api.post<ApiResponse<{ user: User; token: string }>>('/auth/register', data);
    if (response.data.success && response.data.data) {
      const { user, token } = response.data.data;
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      throw new Error(response.data.error?.message || 'Registration failed');
    }
  };

  const logout = () => {
    clearAuth();
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!state.user) return;
    const response = await api.patch<ApiResponse<User>>('/auth/profile', data);
    if (response.data.success && response.data.data) {
      const user = response.data.data;
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      setState(prev => ({ ...prev, user }));
    } else {
      throw new Error(response.data.error?.message || 'Profile update failed');
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, updateProfile, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}