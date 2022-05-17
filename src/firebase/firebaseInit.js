import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAsDnSNHVSU15YLkoRTCCFxJycFZgKtcs4",
    authDomain: "invoice-app-19018.firebaseapp.com",
    projectId: "invoice-app-19018",
    storageBucket: "invoice-app-19018.appspot.com",
    messagingSenderId: "900574578765",
    appId: "1:900574578765:web:3450e8fa5f5ba187c6f404"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();