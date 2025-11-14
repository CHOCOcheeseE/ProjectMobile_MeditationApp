import React, { createContext, useState, useContext, ReactNode } from 'react';

// (FIX) Kriteria 6: Impor API
import {
  apiLogin,
  apiRegister,
  LoginResponse,
  RegisterResponse,
} from '../services/api';

// Tipe untuk nilai yang ada di dalam Context
type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, pass: string) => Promise<boolean>;
  signUp: (
    name: string,
    email: string,
    pass: string,
  ) => Promise<boolean>;
  signOut: () => Promise<void>;
  completeOnboarding: () => void; // (FIX) Fungsi baru
};

// Membuat Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props untuk Provider
type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // (FIX) Mulai dengan false
  const [error, setError] = useState<string | null>(null);

  // (FIX) Kriteria 6: Fungsi signIn dengan API
  const signIn = async (email: string, pass: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Panggil API
      const response: LoginResponse = await apiLogin(email, pass);
      if (response.token) {
        // Berhasil
        setIsAuthenticated(true);
        // Di aplikasi nyata, simpan token di sini (mis: AsyncStorage)
        setIsLoading(false);
        return true;
      }
      // Seharusnya tidak terjadi jika API berhasil, tapi sebagai penjaga
      setError('Login gagal. Token tidak diterima.');
      setIsLoading(false);
      return false;
    } catch (e: any) {
      // Tangkap error dari 'reject' apiLogin
      setError(e.message || 'Terjadi kesalahan saat login.');
      setIsLoading(false);
      return false;
    }
  };

  // (FIX) Kriteria 6: Fungsi signUp dengan API
  const signUp = async (name: string, email: string, pass: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response: RegisterResponse = await apiRegister(
        name,
        email,
        pass,
      );
      if (response.id && response.token) {
        // Berhasil, tapi belum login.
        // Pengguna akan diarahkan ke WelcomeScreen, BUKAN ke app utama.
        // setIsAuthenticated(true); // <-- JANGAN login dulu
        setIsLoading(false);
        return true;
      }
      setError('Registrasi gagal. Token tidak diterima.');
      setIsLoading(false);
      return false;
    } catch (e: any) {
      setError(e.message || 'Terjadi kesalahan saat registrasi.');
      setIsLoading(false);
      return false;
    }
  };

  // (FIX) Ini adalah fungsi yang dipanggil setelah Onboarding selesai
  const completeOnboarding = () => {
    // SEKARANG baru kita anggap user terautentikasi penuh
    setIsAuthenticated(true);
  };

  const signOut = async () => {
    // Di aplikasi nyata, hapus token dari AsyncStorage di sini
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        error,
        signIn,
        signUp,
        signOut,
        completeOnboarding,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

// (FIX) Kriteria 6: INI ADALAH PERBAIKAN UNTUK ERROR 'useAuth'
// Kita lupa mengekspor hook ini.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};