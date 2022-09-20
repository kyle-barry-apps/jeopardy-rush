import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const userFromLocalStorage = JSON.parse(localStorage.getItem('user'))
  const [currentUser, setCurrentUser] = useState(userFromLocalStorage)

  console.log(currentUser)

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children} 
    </UserContext.Provider>
  )
}