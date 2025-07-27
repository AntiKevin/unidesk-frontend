'use client';

import { config } from '@/config';
import type { User } from '@/types/user';
import axios from 'axios';

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

const user = {
  id: 0,
  avatar: '/assets/avatar.png',
  firstName: 'Fulano',
  lastName: 'Silva',
  email: 'fulano@ufma.br',
  role: 'admin',
} satisfies User;

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signUp(_: SignUpParams): Promise<{ error?: string }> {
    // Make API request

    // We do not handle the API, so we'll just generate a token and store it in localStorage.
    const token = generateToken();
    localStorage.setItem('custom-auth-token', token);

    return {};
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { email, password } = params;
    try {
      const response = await axios.post(
        `${config.apiBaseUrl}/auth/login`,
        { usuario: email, senha: password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.status !== 200) {
        return { error: 'Credenciais inválidas' };
      }
      const { token } = response.data;
      if (!token) {
        return { error: 'Token não recebido' };
      }
      localStorage.setItem('auth-token', token);
      return {};
    } catch (err: any) {
      return { error: err.response?.data?.message ?? 'Erro ao efetuar login' };
    }
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      return { data: null };
    }
    try {
      const response = await axios.get<{ user: User }>(
        `${config.apiBaseUrl}/auth/me`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status !== 200) {
        return { data: null, error: 'Não foi possível obter o usuário' };
      }
      return { data: response.data.user };
    } catch (err: any) {
      return { data: null, error: err.response?.data?.message ?? 'Erro ao obter usuário' };
    }
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('custom-auth-token');

    return {};
  }
}

export const authClient = new AuthClient();
