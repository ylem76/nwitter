import firebase from "firebase/app";
// firebase 임포트
// import * as firebase from "firebase"; 구버전


const firebaseConfig = {
  apiKey: "AIzaSyDpBWrmEq6ygH3ugZgMAKo06GNOzYGZ2gI",
  authDomain: "nwitter-b7a11.firebaseapp.com",
  projectId: "nwitter-b7a11",
  storageBucket: "nwitter-b7a11.appspot.com",
  messagingSenderId: "764575120533",
  appId: "1:764575120533:web:6c565d2ab7536e159faf9c"
};


export default firebase.initializeApp(firebaseConfig);