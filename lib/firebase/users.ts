
'use client';

import { doc, setDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { initializeFirebase, errorEmitter, FirestorePermissionError } from '@/firebase';

export interface UserProfileData {
  email: string;
  firstName: string;
  lastName: string;
  role?: 'recruiter' | 'candidate'; // Role is now optional here
  photoURL?: string;
  createdAt?: any;
  updatedAt?: any;
}

const { firestore } = initializeFirebase();

/**
 * Creates a user profile document in Firestore.
 * This is now a blocking operation that returns a promise.
 */
export function createUserProfile(uid: string, data: UserProfileData): Promise<void> {
  const userDocRef = doc(firestore, 'users', uid);
  const profileData = {
    ...data,
    createdAt: serverTimestamp(),
  };

  // The 'create' operation should be allowed by the security rules.
  return setDoc(userDocRef, profileData).catch((error) => {
    const permissionError = new FirestorePermissionError({
        path: userDocRef.path,
        operation: 'create',
        requestResourceData: profileData,
    });
    errorEmitter.emit('permission-error', permissionError);
    throw permissionError; // Re-throw the error to be caught by the caller
  });
}

/**
 * Updates a user profile document in Firestore.
 * This is a blocking operation that returns a promise.
 */
export function updateUserProfile(uid: string, data: Partial<UserProfileData>): Promise<void> {
    const userDocRef = doc(firestore, 'users', uid);
    const updateData = {
        ...data,
        updatedAt: serverTimestamp(),
    };

    return updateDoc(userDocRef, updateData).catch((error) => {
        const permissionError = new FirestorePermissionError({
            path: userDocRef.path,
            operation: 'update',
            requestResourceData: updateData,
        });
        errorEmitter.emit('permission-error', permissionError);
        throw permissionError; // Re-throw the error to be caught by the caller
    });
}
