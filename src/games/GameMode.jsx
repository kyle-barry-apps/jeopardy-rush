import { useContext, useState } from "react"
import { useEffect } from "react"
import Loading from "../components/Loading"
import QuestionContainer from "./QuestionContainer"
import GameContext from "../contexts/GameContext"

const GameMode = () => {
  const { replay, loading, setLoading , setData } = useContext(GameContext)

  useEffect(() => {
    const mainUrl = 'https://api.npoint.io/05e6d4ae7ce87f8bf750'
    fetch(mainUrl)
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