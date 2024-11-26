import admin from "firebase-admin";
import serviceaccountkey from "./serviceAccountKey.js";

admin.initializeApp({
  credential: admin.credential.cert(serviceaccountkey),
});

export const auth = admin.auth();