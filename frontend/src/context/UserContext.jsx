// src/context/UserContext.jsx
import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // Guardamos el usuario aquí

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook para usarlo fácilmente
export function useUser() {
  return useContext(UserContext);
}
