'use client'
import { jwtDecode } from 'jwt-decode';



interface MyJwtPayload {
  name?: string;
  email?: string;
  
}

class User {
  private static getTokenPayload(): MyJwtPayload | null {
    if (typeof window === 'undefined') return null; // proteção SSR
    const token = localStorage.getItem('sessionToken');
    if (!token) {
      console.warn('Token não encontrado');
      return null;
    }

    try {
      const decoded = jwtDecode<MyJwtPayload>(token);
      if (typeof decoded === 'object' && decoded !== null) {
        return decoded;
      }
      return null;
    } catch (e) {
      console.warn('Erro ao decodificar token:', e);
      return null;
    }
  }

  static async getUserName(): Promise<string | null> {
    const payload = this.getTokenPayload();
    if (payload && typeof payload.name === 'string') {
      return payload.name;
    }
    return null;
  }

  static async getEmail(): Promise<string | null> {
    const payload = this.getTokenPayload();
    if (payload && typeof payload.email === 'string') {
      return payload.email;
    }
    return null;
  }
}


export default User;