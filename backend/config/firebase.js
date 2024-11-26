import admin from "firebase-admin";
import serviceaccountkey from "./serviceaccountkey.js";

admin.initializeApp({
  credential: admin.credential.cert(serviceaccountkey),
});

export const auth = admin.auth();
