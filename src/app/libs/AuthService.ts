// src/libs/AuthService.ts
import { RegisterForm } from "@/types/RegisterForm";

export default class AuthService {
  private static readonly API_BASE_URL = "http://localhost:3000/api/auth";
  private static readonly TOKEN_KEY = "token";
  private static readonly USER_KEY = "user";

  static async Register(data: RegisterForm) {
    try {
      const response = await fetch(`${this.API_BASE_URL}/register`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data),
      });
      return response;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  static async Login(email: string, password: string) {
    try {
      const response = await fetch(`${this.API_BASE_URL}/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email, password }),
      });
      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  static isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem(this.TOKEN_KEY);
    const userData = localStorage.getItem(this.USER_KEY);
    return !!(token && userData);
  }

  static removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
  }
}