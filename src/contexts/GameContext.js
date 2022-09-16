import { useEffect, createContext, useState } from "react";

const GameContext = createContext()

export const GameProvider = ({children}) => {

  const [showResults, setShowResults] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentGameData, setCurrentGameData] = useState([])
  const [replay, setReplay] = useState(0)
  const [allGamesData, setAllGamesData] = useState([])

  return (
    <GameContext.Provider value={{ allGamesData, setAllGamesData, replay, setReplay, showResults, setShowResults, gameStarted, setGameStarted, loading, setLoading, data, setData,  currentGameData, setCurrentGameData}}>
      {children}
    </GameContext.Provider>
  )
}

export default GameContext