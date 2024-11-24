import admin from "firebase-admin";
import serviceaccountkey from "./serviceaccountkey.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceaccountkey),
});

export const auth = admin.auth();
