import * as firebase from 'firebase/app'
import 'firebase/storage';
import "firebase/auth";

const config = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
};
firebase.initializeApp(config);

export const storage = firebase.storage();

export const auth = firebase.auth();

export const signIn = ()=>{
  let provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider).then(()=>{
  })
}

export const signOut = ()=>{
  auth.signOut().then(()=>{
  });
}

export const isSignedIn = ()=>{
  return !!auth.currentUser;
}
