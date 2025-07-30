'use client';

import { config } from '@/config';
import axios from 'axios';
import api from '../axios';

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
  role: 'ADMIN',
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
  usuario: string;
  senha: string;
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
    const { usuario, senha } = params;
    try {
      const response = await axios.post(
        `${config.apiBaseUrl}/auth/login`,
        { usuario, senha },
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
      const response = await api.get(`/auth/me`);
      if (response.status !== 200) {
        return { data: null, error: 'Não foi possível obter o usuário' };
      }

      const user: User = {
        id: response.data.idUsuario,
        avatar: response.data.avatar || '/assets/avatar.png',
        firstName: response.data.nome.split(' ')[0] || '',
        lastName: response.data.nome.split(' ')[1] || '',
        email: response.data.email,
        role: response.data.role || 'user',
      }

      return { data: user };
    } catch (err: any) {
      console.error('Erro ao obter usuário:', err);
      return { data: null, error: err.response?.data?.message ?? 'Erro ao obter usuário' };
    }
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('auth-token');

    return {};
  }
}

export const authClient = new AuthClient();
