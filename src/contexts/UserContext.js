import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const userFromLocalStorage = localStorage.getItem('user')
  console.log('Local Storage user: ', userFromLocalStorage)
  const [currentUser, setCurrentUser] = useState(userFromLocalStorage)
  console.log('Current User: ', currentUser)

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children} 
    </UserContext.Provider>
  )
}