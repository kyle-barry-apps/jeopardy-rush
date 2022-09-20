import { useContext, useState } from "react"
import { useEffect } from "react"
import Loading from "../components/Loading"
import Error from "../components/Error"
import QuestionContainer from "./QuestionContainer"
import GameContext from "../contexts/GameContext"

const GameMode = () => {
  const { replay, loading, setLoading , setData } = useContext(GameContext)
  const [error, setError] = useState()

  const endpointArray = [
    process.env.REACT_APP_QUESTIONS_ENDPOINT_1,
    process.env.REACT_APP_QUESTIONS_ENDPOINT_2,
    process.env.REACT_APP_QUESTIONS_ENDPOINT_3,
    process.env.REACT_APP_QUESTIONS_ENDPOINT_4,
    process.env.REACT_APP_QUESTIONS_ENDPOINT_5
  ]

  const randomQuestionEndpoint = endpointArray[Math.floor(Math.random() * 5)]

  useEffect(() => {
    fetch(randomQuestionEndpoint)
    .then((res) => res.json())
    .then((data) => {
      setData(data)
      setLoading(false)
    })
    .catch((error) => setError(error.message))
  }, [replay])

  if(loading) {
    return (
      <Loading />
  )}

  if(error) {
    return (
      <Error />
    )
  }

  return (
    <QuestionContainer />
  )
}

export default GameMode