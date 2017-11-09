import Firebase from 'firebase'

/* Firebase configuration */
let config = {
    apiKey: "AIzaSyC0m2r-fsfVhW3x9QVdVoNKuzlly0CEKGE",
    authDomain: "paiduay-a7d24.firebaseapp.com",
    databaseURL: "https://paiduay-a7d24.firebaseio.com",
    projectId: "paiduay-a7d24",
    storageBucket: "paiduay-a7d24.appspot.com",
    messagingSenderId: "868729044338"
};

const firebaseApp = Firebase.initializeApp(config);
const db = firebaseApp.database();

export {firebaseApp, db};