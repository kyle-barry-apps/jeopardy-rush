import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const userFromLocalStorage = localStorage.getItem('user')
  const [currentUser, setCurrentUser] = useState(userFromLocalStorage)

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children} 
    </UserContext.Provider>
  )
}