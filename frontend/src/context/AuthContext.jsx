import { useState, useEffect, createContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            firebaseToken: token,
          }
        );
        setCurrentUser({
          firebaseId: user.uid,
          email: user.email,
          token: user.accessToken,
          ...response.data.user,
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
