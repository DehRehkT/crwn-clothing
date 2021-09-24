import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {  
  apiKey: "AIzaSyBEMbrNj33xQQA4W697nM7r-uvCAI_ET84",
  authDomain: "crwn-db-36747.firebaseapp.com",
  projectId: "crwn-db-36747",
  storageBucket: "crwn-db-36747.appspot.com",
  messagingSenderId: "660865553489",
  appId: "1:660865553489:web:e8df34a035ebe0823a5470",
  measurementId: "G-T6S5DZ2LNS" 
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
  
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;