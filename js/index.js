
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
  orderBy,
  limit,
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

var uid;

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    uid = user.email;
    console.log(user);

    elementos.btnCerrar.removeAttribute("hidden");
    elementos.containerJuego.removeAttribute("hidden");
    elementos.juego.removeAttribute("hidden");
    elementos.btnHigh.removeAttribute("hidden");
    elementos.reiniciar.removeAttribute("hidden");
    elementos.containerLog.setAttribute("hidden", "hidden");

    //elementos.crud.removeAttribute("hidden");
    // ...
  } else {
    // User is signed out
    // ...
    elementos.containerJuego.setAttribute("hidden", "hidden");
    elementos.reiniciar.setAttribute("hidden", "hidden");
    elementos.btnHigh.setAttribute("hidden", "hidden");
    elementos.resultados.setAttribute("hidden", "hidden");
    elementos.juego.setAttribute("hidden", "hidden");
    elementos.btnCerrar.setAttribute("hidden", "hidden");
    //elementos.crud.setAttribute("hidden", "hidden");
    elementos.containerLog.removeAttribute("hidden");

    console.log(user);
  }
});

//----------AQUÍ EMPIEZA EL JUEGO----------

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 430,
  parent: "juego",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};
var score = 0;
var scoreText;

var game = new Phaser.Game(config);

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.image('star', 'assets/star.png');
  this.load.image('bomb', 'assets/bomb.png');
  this.load.spritesheet('dude',
    'assets/dude.png',
    { frameWidth: 32, frameHeight: 48 }
  );
  this.load.spritesheet('dude2',
    'assets/dude2.png',
    { frameWidth: 32, frameHeight: 48 }
  );
}

var platforms;
var player;
var player2;
var stars;
var bombs;
var cursors;
var gameOver;

let keyA;
let keyS;
let keyD;
let keyW;

function create() {
  this.add.image(400, 300, 'sky');

  platforms = this.physics.add.staticGroup();

  platforms.create(400, 458, 'ground').setScale(2).refreshBody();

  platforms.create(600, 370, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(520, 100, 'ground');


  player = this.physics.add.sprite(100, 400, 'dude');
  player2 = this.physics.add.sprite(400, 0, 'dude2');

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  player2.setBounce(0.2);
  player2.setCollideWorldBounds(true);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });
  player.body.setGravityY(200)
  this.physics.add.collider(player, platforms);
  //---------JUGADOR 2---------------------
  this.anims.create({
    key: 'A',
    frames: this.anims.generateFrameNumbers('dude2', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'W',
    frames: [{ key: 'dude2', frame: 4 }],
    frameRate: 20
  });

  this.anims.create({
    key: 'D',
    frames: this.anims.generateFrameNumbers('dude2', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });
  player2.body.setGravityY(200)
  this.physics.add.collider(player2, platforms);
  //--------------------------------

  stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  });

  stars.children.iterate(function (child) {

    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

  });
  this.physics.add.collider(stars, platforms);
  this.physics.add.overlap(player, stars, collectStar, null, this);
  //this.physics.add.overlap(player2, stars, collectStar2, null, this);
  scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

  bombs = this.physics.add.group();

  this.physics.add.collider(bombs, platforms);

  this.physics.add.collider(player, bombs, hitBomb, null, this);
  this.physics.add.collider(player, player2, hitBomb2, null, this);

  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

}
function update() {
  cursors = this.input.keyboard.createCursorKeys();
  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play('left', true);
  }
  else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play('right', true);
  }
  else {
    player.setVelocityX(0);

    player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-400);
  }
  //-------------------JUGADOR 2 --------

  if (keyA.isDown) {
    player2.setVelocityX(-170);

    player2.anims.play('A', true);
  }
  else if (keyD.isDown) {
    player2.setVelocityX(170);

    player2.anims.play('D', true);
  }
  else {
    player2.setVelocityX(0);

    player2.anims.play('W');
  }

  if (keyW.isDown && player2.body.touching.down) {
    player2.setVelocityY(-400);
  }


}
function collectStar(player, star) {
  star.disableBody(true, true);

  score += 10;
  scoreText.setText('Score: ' + score);

  if (stars.countActive(true) === 0) {
    stars.children.iterate(function (child) {

      child.enableBody(true, child.x, 0, true, true);

    });

    var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    var bomb = bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

  }
}
function collectStar2(player2, star) {
  star.disableBody(true, true);

  score += 10;
  scoreText.setText('Score: ' + score);

  if (stars.countActive(true) === 0) {
    stars.children.iterate(function (child) {

      child.enableBody(true, child.x, 0, true, true);

    });

    var x = (player2.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    var bomb = bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

  }
}
async function hitBomb(player, bomb) {
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play('turn');

  gameOver = true;

  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "highscores"), {
    name: uid,
    score: score
  });
  console.log("Document written with ID: ", docRef.id);
}


async function hitBomb2(player2, bomb) {
  this.physics.pause();

  player2.setTint(0xff0000);

  player2.anims.play('turn');

  gameOver = true;

  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "highscores"), {
    name: uid,
    score: score
  });
  console.log("Document written with ID: ", docRef.id);
}


elementos.btnHigh.addEventListener("click", async () => {
  elementos.resultados.removeAttribute("hidden");
  var q = query(collection(db, "highscores"), orderBy("score", "desc"), limit(3));


  const querySnapshot = await getDocs(q);
  console.log(querySnapshot)
  var estadisticas = "<h2>TOP 3🏆</h2><ul>"
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    estadisticas = estadisticas.concat(`<li><b>${doc.data().name}:</b> ${doc.data().score}</li>`)
    console.log(estadisticas)
  });
  estadisticas = estadisticas.concat("</ul>")
  elementos.resultados.innerHTML = estadisticas
})