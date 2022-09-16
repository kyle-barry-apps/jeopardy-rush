import { useContext, useState } from "react"
import { useEffect } from "react"
import Loading from "../components/Loading"
import QuestionContainer from "./QuestionContainer"
import GameContext from "../contexts/GameContext"

const GameMode = () => {
  const { replay, loading, setLoading , setData } = useContext(GameContext)

  useEffect(() => {
    fetch('https://api.npoint.io/8f54821c55f6110e8299')
    .then((res) => res.json())
    .then((data) => {
      setData(data)
      setLoading(false)
    })
    .catch((error) => console.log(error.message))
  }, [replay])

  if(loading) {
    return (
      <Loading />
  )}

  return (
    <QuestionContainer />
  )
}

export default GameMode