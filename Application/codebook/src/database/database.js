// import firebase
import * as firebase from 'firebase';

// configurate firebase
var config = {
    apiKey: "AIzaSyDO_8jv1lI00AFF_wlsc9NGolVNGzs85us",
    authDomain: "codebook-acfc0.firebaseapp.com",
    databaseURL: "https://codebook-acfc0.firebaseio.com",
    storageBucket: "codebook-acfc0.appspot.com",
    messagingSenderId: "350244656120"
};

// initialize firebase App
firebase.initializeApp(config);

export const database = firebase;