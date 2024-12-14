import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";
const firebaseConfig = {
  apiKey: "AIzaSyAbo5YveWINu2Y3jsBK0xC5Oh5zDzFPSA8",
  authDomain: "opuslink-a7870.firebaseapp.com",
  projectId: "opuslink-a7870",
  storageBucket: "opuslink-a7870.firebasestorage.app",
  messagingSenderId: "162580218491",
  appId: "1:162580218491:web:ced1c29d3cd337062f98de",
  measurementId: "G-8C18GCCLWT",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// register user to mongo
const registerUserToMongo = async (name, email, uid, img, isClient, bio) => {
  await fetch("http://localhost:3000/api/auth/register", {
    // Need to use axios here
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      uid,
      img,
      isClient,
      bio,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then(() => {
      console.log("User registered sucessfully!");
    })
    .catch((err) => {
      console.log(err.message);
    });

    // const response = await fetch("http://localhost:3000/api/auth/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ uid }),
    // });

    // const user = await response.json();

    // localStorage.setItem("currentUser", JSON.stringify(user));
};

// const signInWithGoogle = async () => {
//   try {
//     const response = await signInWithPopup(auth, googleProvider);
//     const user = response.user;
//     const q = query(collection(db, "users"), where("uid", "==", user.uid));
//     const docs = await getDocs(q);
//     if (docs.docs.length === 0) {
//       await addDoc(collection(db, "users"), {
//         uid: user.uid,
//         name: user.displayName,
//         authProvider: "google",
//         email: user.email,
//       });
//     }
//   } catch (error) {
//     console.log(error.message);
//     alert(error.message);
//   }
// };

const logInWithEmailAndPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const uid = res.user.uid;

    // const response = await fetch("http://localhost:3000/api/auth/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ uid }),
    // });

    // const user = await response.json();

    // localStorage.setItem("currentUser", JSON.stringify(user));

  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

const registerInWithEmailAndPassword = async (
  name,
  email,
  password,
  img,
  isClient,
  bio
) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = response.user;
    const profilePic = img
      ? img
      : "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?t=st=1733884083~exp=1733887683~hmac=3acdac16f592cc2761772a7f961212010f6dc103c2024b14a37f084a7a552969&w=740";
    // await addDoc(collection(db, "users"), {
    //   uid: user.uid,
    //   name,
    //   authProvider: "local",
    //   email,
    // });
    await registerUserToMongo(name, email, user.uid, profilePic, isClient, bio);
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent");
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
};

const logOut = () => {
  try {
    signOut(auth);
    localStorage.removeItem("currentUser", null);
  } catch (error) {
    alert(error.message);
  }
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerInWithEmailAndPassword,
  sendPasswordReset,
  logOut,
};
