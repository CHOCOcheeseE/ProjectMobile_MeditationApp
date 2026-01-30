import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  signInWithCredential,
  GoogleAuthProvider,
  User,
  Auth
} from 'firebase/auth';
import { auth } from '../services/firebase';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

// --- TYPES ---
interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, pass: string) => Promise<void>;
  signUp: (name: string, email: string, pass: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  signInWithGoogle: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Google Auth Request
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '574087940750-g1bu4ngcfdvohce9inpq0gjaighmvfdu.apps.googleusercontent.com',
  });

  // Listen to Auth State Changes
  useEffect(() => {
    if (!auth) {
      console.warn("Auth initialization delayed or failed.");
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (usr: User | null) => {
      setUser(usr);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  // Handle Google Sign-In Response
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      if (auth) {
        setIsLoading(true);
        signInWithCredential(auth, credential)
          .catch((e: any) => setError(e.message))
          .finally(() => setIsLoading(false));
      }
    } else if (response?.type === 'error') {
      setError("Google Sign-In failed or was cancelled.");
    }
  }, [response]);

  const clearError = () => {
    setError(null);
  };

  // Sign In dengan Google
  const signInWithGoogle = async () => {
    setError(null);
    if (!auth) {
      setError("Firebase configuration error.");
      return;
    }
    try {
      await promptAsync();
    } catch (e: any) {
      setError(e.message);
    }
  };

  // Sign In dengan Email/Password
  const signIn = async (email: string, pass: string) => {
    if (!auth) throw new Error("Firebase belum dikonfigurasi.");
    setIsLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (e: any) {
      const errorMessage = getAuthErrorMessage(e.code);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Sign Up dengan Email/Password
  const signUp = async (name: string, email: string, pass: string): Promise<boolean> => {
    if (!auth) throw new Error("Firebase belum dikonfigurasi.");
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const newUser = userCredential.user;
      await updateProfile(newUser, { displayName: name });
      return true;
    } catch (e: any) {
      const errorMessage = getAuthErrorMessage(e.code);
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Reset Password
  const resetPassword = async (email: string): Promise<boolean> => {
    if (!auth) throw new Error("Firebase belum dikonfigurasi.");
    setIsLoading(true);
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (e: any) {
      const errorMessage = getAuthErrorMessage(e.code);
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign Out
  const signOut = async () => {
    if (!auth) return;
    setError(null);
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, error, signIn, signUp, signOut, resetPassword, signInWithGoogle, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Helper function untuk translate error code Firebase
const getAuthErrorMessage = (code: string): string => {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      return 'Email atau password salah';
    case 'auth/user-not-found':
      return 'User tidak ditemukan';
    case 'auth/email-already-in-use':
      return 'Email sudah terdaftar';
    case 'auth/weak-password':
      return 'Password terlalu lemah (min 6 karakter)';
    case 'auth/invalid-email':
      return 'Format email tidak valid';
    case 'auth/too-many-requests':
      return 'Terlalu banyak percobaan. Coba lagi nanti.';
    case 'auth/network-request-failed':
      return 'Gagal terhubung ke server. Periksa koneksi internet.';
    case 'auth/account-exists-with-different-credential':
      return 'Akun sudah terdaftar dengan metode login lain.';
    default:
      return 'Terjadi kesalahan. Silakan coba lagi.';
  }
};