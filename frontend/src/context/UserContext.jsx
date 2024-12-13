import { createContext, useState, useEffect } from "react";

// Create UserContext
export const UserContext = createContext();

// UserProvider Component to provide user context to all children
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Function to update user globally
  const updateUser = (user) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <UserContext.Provider value={{ currentUser, updateUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
