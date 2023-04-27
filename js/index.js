
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
import {
  getFirestore,
  doc,
  collection,
  addDoc,
  setDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  GithubAuthProvider
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

import { elementos } from "./html.js"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4qkJ-ooA3EpKQTWPjjuo_MDI3gjrD78k",
  authDomain: "se-i-90f68.firebaseapp.com",
  projectId: "se-i-90f68",
  storageBucket: "se-i-90f68.appspot.com",
  messagingSenderId: "14510212614",
  appId: "1:14510212614:web:8d434cbac0bf4331a0a587",
  measurementId: "G-GD68X2D7PZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

//const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const providerGoogle = new GoogleAuthProvider();
const providerGitHub = new GithubAuthProvider();

document.addEventListener("load", () => {
  elementos.resultados.setAttribute("hidden", "hidden");
})

elementos.btnCrear.addEventListener("click", () => {
  createUserWithEmailAndPassword(auth, elementos.email.value, elementos.password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      console.log(user)
      alert("El usuario " + user.email + " se registró correctamente")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Hubo un error \n" + errorMessage)
      // ..
    });
});
elementos.btnIniciar.addEventListener("click", () => {
  signInWithEmailAndPassword(auth, elementos.email.value, elementos.password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert("El usuario " + user.email + " inició sesión")
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    });
})


elementos.btnCerrar.addEventListener("click", () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    alert("Ha cerrado sesión");
  }).catch((error) => {
    // An error happened.
    console.log(error)

  });
})
elementos.btnGoogle.addEventListener("click", () => {

  signInWithPopup(auth, providerGoogle)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      alert(errorMessage)
    });
})
elementos.btnYahoo.addEventListener("click", () => {

  alert("No sea mentiroso, nadie usa Yahoo")
})
elementos.btnGitHub.addEventListener("click", () => {

  signInWithPopup(auth, providerGitHub)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...
    });
})

elementos.btnFb.addEventListener("click", () => {

  const providerFb = new FacebookAuthProvider();
  signInWithPopup(auth, providerFb)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);

      // ...
    });
})



onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log(user);

    elementos.btnCerrar.removeAttribute("hidden");
    elementos.juego.removeAttribute("hidden");
    elementos.containerLog.setAttribute("hidden", "hidden");
    //elementos.crud.removeAttribute("hidden");
    // ...
  } else {
    // User is signed out
    // ...
    elementos.juego.setAttribute("hidden", "hidden");
    elementos.btnCerrar.setAttribute("hidden", "hidden");
    //elementos.crud.setAttribute("hidden", "hidden");
    elementos.containerLog.removeAttribute("hidden");

    console.log(user);
  }
});

