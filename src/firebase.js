import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAPFzS6S2afwY96QmYt5Ppm4twzc2R0JZE',
  authDomain: 'm-passport.firebaseapp.com',
  projectId: 'm-passport',
  storageBucket: 'm-passport.firebasestorage.app',
  messagingSenderId: '242815874241',
  appId: '1:242815874241:web:7ba487b32802c866aad040',
  measurementId: 'G-YN3R1R1K5Z',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

isSupported()
  .then((ok) => {
    if (ok) getAnalytics(app)
  })
  .catch(() => {})
