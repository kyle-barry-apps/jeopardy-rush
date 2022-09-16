import { useEffect } from "react"
import { useState } from "react"
import GameOver from "./GameOver"
import GameContext from "../contexts/GameContext"
import { useContext } from "react"

const QuestionContainer = () => {
  const { replay, showResults, data, setShowResults, currentGameData, setCurrentGameData, allGamesData, setAllGamesData } = useContext(GameContext)
  
  const [currentQ, setCurrentQ] = useState(data[Math.floor(Math.random()*10000)])

  useEffect(() => {
    console.log('timer started')
    setTimeout(() => {
      setShowResults(true)
      setCurrentQ(data[Math.floor(Math.random()*10000)])
   }, 60000) 
  },[replay])

  const handleAnswerSubmit = (e) => {
    e.preventDefault()
    const answer = e.target.answer.value
    const newQandA = {...currentQ, answer: answer, timestamp: new Date().toLocaleString()}

    e.target.reset()
    setCurrentGameData(() => [...currentGameData, newQandA])
    setCurrentQ(data[Math.floor(Math.random()*10000)])
    setAllGamesData(() => [...allGamesData, newQandA])
  }

  console.log(currentGameData)

  if(showResults) {
    return (
      <GameOver />
    )
  }

  return (
    <section className="question-container">
      <div className="category-and-value">
        <span>{currentQ.category}</span>
        <span>{currentQ.value}</span>
      </div>
      <h2>{currentQ.question}</h2>
      <form onSubmit={handleAnswerSubmit}>
        <input autoFocus name='answer' type="text" />
        <button style={{display: 'none'}} type='submit'></button>
      </form>
    </section>
  )

}

export default QuestionContainer