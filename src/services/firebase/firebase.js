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

export const signIn = (setUser)=>{
  let provider = new firebase.auth.GoogleAuthProvider();

  return auth.signInWithPopup(provider).then(() => {
    setUser(auth.currentUser);
  });
}

export const signOut = (setUser)=>{
  return auth.signOut().then(()=>setUser(null))
}

export const upload = async (file, path) => {
  const reference = storage.ref().child(path);
  return reference && reference.put(file)
};

