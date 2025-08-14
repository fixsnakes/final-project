export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    token?: string;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
  }
  