
'use client';
import {
  Auth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { createUserProfile } from '@/lib/firebase/users';

/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  signInAnonymously(authInstance);
}

/** Initiate email/password sign-up. Returns a promise that resolves on success or rejects on failure. */
export async function initiateEmailSignUp(authInstance: Auth, email: string, password: string, displayName: string): Promise<void> {
  const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
  if (userCredential.user) {
    const { user } = userCredential;
    await updateProfile(user, { displayName });
    
    // Create a profile with a default role of 'recruiter'
    // This now awaits, ensuring the profile is created before proceeding.
    await createUserProfile(user.uid, {
      email: user.email!,
      firstName: displayName.split(' ')[0] || '',
      lastName: displayName.split(' ')[1] || '',
      role: 'recruiter', // Always assign a default role
    });
  }
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string) {
  // Return the promise so the caller can handle success/failure
  return signInWithEmailAndPassword(authInstance, email, password);
}
