// src/services/auth.ts

import { LoginCredentials, RegisterCredentials, User, AuthResponse, UpdateProfileData } from '../types/auth';

export class AuthService {
  private static readonly API_URL = 'http://localhost:1337/api';

  private static async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      if (response.status === 401) {
        // Clear invalid auth data
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
      }
      
      const error = await response.json();
      throw new Error(error.error?.message || 'An error occurred');
    }
    return response.json();
  }

  private static getAuthHeader(): HeadersInit {
    const token = localStorage.getItem('jwt');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${this.API_URL}/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    return this.handleResponse<AuthResponse>(response);
  }

  static async register(credentials: RegisterCredentials): Promise<void> {
    const response = await fetch(`${this.API_URL}/auth/local/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    await this.handleResponse(response);
  }

  static async getCurrentUser(): Promise<User> {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${this.API_URL}/users/me`, {
      headers: this.getAuthHeader(),
    });

    return this.handleResponse<User>(response);
  }

  static async updateProfile(data: UpdateProfileData): Promise<User> {
    const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
    if (!userId) {
      throw new Error('User ID not found');
    }

    const response = await fetch(`${this.API_URL}/users/${userId}`, {
      method: 'PUT',
      headers: this.getAuthHeader(),
      body: JSON.stringify(data),
    });

    return this.handleResponse<User>(response);
  }

  static async changePassword(data: { currentPassword: string; password: string; passwordConfirmation: string }): Promise<void> {
    const response = await fetch(`${this.API_URL}/auth/change-password`, {
      method: 'POST',
      headers: this.getAuthHeader(),
      body: JSON.stringify(data),
    });

    await this.handleResponse(response);
  }
}