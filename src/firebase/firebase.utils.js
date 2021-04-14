import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCO2zp0NQlRALuFTif8zGCKR3S-TdDCZ5E",
  authDomain: "crwn-db-7dd89.firebaseapp.com",
  projectId: "crwn-db-7dd89",
  storageBucket: "crwn-db-7dd89.appspot.com",
  messagingSenderId: "580023710799",
  appId: "1:580023710799:web:cc9f24e98c93528dcc263a",
  measurementId: "G-NJVWY4BBMM"
};


export const createUserProfileDocument = async (userAuth, additionalData) => {
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
}; 

firebase.initializeApp(config);


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;