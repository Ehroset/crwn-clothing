import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBNh5FMTR2Pzpbgh_TRILL8qRCNUiyjHcU",
    authDomain: "crwn-db-es.firebaseapp.com",
    databaseURL: "https://crwn-db-es.firebaseio.com",
    projectId: "crwn-db-es",
    storageBucket: "crwn-db-es.appspot.com",
    messagingSenderId: "558226776211",
    appId: "1:558226776211:web:9bd58a3626add0aa402d66",
    measurementId: "G-32ZH77V8QC"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`/users/${userAuth.uid}`);

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
        } catch(error) {
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