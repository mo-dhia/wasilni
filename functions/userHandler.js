import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, getIdToken, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { configDotenv } from 'dotenv';
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhFLfyBfE1TfsFVT7OkrJeJeE4hf2_otA",
  authDomain: "naql-68aba.firebaseapp.com",
  projectId: "naql-68aba",
  storageBucket: "naql-68aba.appspot.com",
  messagingSenderId: "703276550006",
  appId: "1:703276550006:web:bec63cc3a335b4cbbb9c57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to authenticate user
export async function authenticateUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get Firebase ID token
    const token = await getIdToken(user);
    console.log('User authenticated successfully:', user);
    return { user, token };
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw error;
  }
}

// Function to create a new user
export async function createUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Initialize the user document in Firestore with favourites field
    await setDoc(doc(db, 'users', user.uid), {
      email,
      favourites: []
    });

    // Get Firebase ID token
    const token = await getIdToken(user);
    console.log('User created successfully:', user);
    return { user, token };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Function to sign out user
export async function signOutUser() {
  try {
    await signOut(auth);
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Error signing out user:', error);
    throw error;
  }
}

// Function to authenticate user with Google
export async function authenticateWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Get Firebase ID token
    const token = await getIdToken(user);
    console.log('User authenticated with Google successfully:', user);
    return { user, token };
  } catch (error) {
    console.error('Error authenticating with Google:', error);
    throw error;
  }
}

// Function to reset password
export async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
}

// Function to add a favourite item
export async function addFavourite(userId, item) {
  try {
    const userDoc = doc(db, 'users', userId);
    await updateDoc(userDoc, {
      favourites: arrayUnion(item)
    });
    console.log('Favourite item added successfully');
  } catch (error) {
    console.error('Error adding favourite item:', error);
    throw error;
  }
}

// Function to remove a favourite item
export async function removeFavourite(userId, item) {
  try {
    const userDoc = doc(db, 'users', userId);
    await updateDoc(userDoc, {
      favourites: arrayRemove(item)
    });
    console.log('Favourite item removed successfully');
  } catch (error) {
    console.error('Error removing favourite item:', error);
    throw error;
  }
}

// Function to get user favourites
export async function getFavourites(userId) {
  try {
    const userDoc = doc(db, 'users', userId);
    const userSnap = await getDoc(userDoc);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      console.log('User favourites retrieved successfully');
      return userData.favourites;
    } else {
      console.log('No such user document');
      return [];
    }
  } catch (error) {
    console.error('Error getting favourites:', error);
    throw error;
  }
}

// Function to authenticate user with phone number
export async function authenticateWithPhoneNumber(phoneNumber, appVerifier) {
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    console.log('SMS sent. Please verify the code.');
    return confirmationResult; // This will be used to verify the code
  } catch (error) {
    console.error('Error authenticating with phone number:', error);
    throw error;
  }
}

// Function to verify phone number
export async function verifyPhoneNumber(confirmationResult, verificationCode) {
  try {
    const userCredential = await confirmationResult.confirm(verificationCode);
    const user = userCredential.user;

    // Get Firebase ID token
    const token = await getIdToken(user);
    console.log('Phone number verified successfully:', user);
    return { user, token };
  } catch (error) {
    console.error('Error verifying phone number:', error);
    throw error;
  }
}

// Example usage for creating a new user
// createUser('newuser@example.com', 'newpassword123')
//   .then(({ user, token }) => {
//     console.log('Created user:', user);
//     console.log('Token:', token);
//   })
//   .catch(error => {
//     console.error('Creation error:', error);
//   });

// Example usage for adding a favourite item
// addFavourite('user-id-here', 'item-id-here')
//   .then(() => {
//     console.log('Added favourite item');
//   })
//   .catch(error => {
//     console.error('Add favourite error:', error);
//   });

// Example usage for getting favourites
// getFavourites('user-id-here')
//   .then(favourites => {
//     console.log('Favourites:', favourites);
//   })
//   .catch(error => {
//     console.error('Get favourites error:', error);
//   });

// Example usage for phone authentication
// const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
//   'size': 'invisible',
//   'callback': (response) => {
    
//   }
// }, auth);

// authenticateWithPhoneNumber('+21655911117', recaptchaVerifier)
//   .then(confirmationResult => {
//     // Simulating user entering the received verification code
//     const verificationCode = prompt('Enter the verification code you received');
//     return verifyPhoneNumber(confirmationResult, verificationCode);
//   })
//   .then(({ user, token }) => {
//     console.log('Phone authenticated user:', user);
//     console.log('Token:', token);
//   })
//   .catch(error => {
//     console.error('Phone authentication error:', error);
//   });
