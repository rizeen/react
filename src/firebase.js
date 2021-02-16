import firebase from 'firebase';
  
  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDqKxZq92_pq3PKtDktK21ioJikj-ieA0M",
    authDomain: "inqubit-9e8ba.firebaseapp.com",
    projectId: "inqubit-9e8ba",
    storageBucket: "inqubit-9e8ba.appspot.com",
    messagingSenderId: "528181558933",
    appId: "1:528181558933:web:45b1605fdcd1f6c443659c",
    measurementId: "G-B5EE61WX3C"      
  });
  
const db = firebaseApp.firestore();

export default db;