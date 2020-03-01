
import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyBf9v0n95ubCs-3Z06s6RluSd3jD6ng8cA",
  authDomain: "fir-demo-31f5d.firebaseapp.com",
  databaseURL: "https://fir-demo-31f5d.firebaseio.com",
  projectId: "fir-demo-31f5d",
  storageBucket: "fir-demo-31f5d.appspot.com",
  messagingSenderId: "332069641084",
  appId: "1:332069641084:web:1a88bc37172e11e43da2f9"
}
firebase.initializeApp(config);

export default firebase;