import { useEffect, useState, useContext } from "react"
import { colRef } from "../firebase/Firebase"
import { addDoc } from "firebase/firestore"
import GameOver from "./GameOver"
import GameContext from "../contexts/GameContext"
import { UserContext } from "../contexts/UserContext"
import { isCorrect } from "../utils/createStats"

const QuestionContainer = () => {
  const { replay, showResults, data, setShowResults, currentGameData, setCurrentGameData, allGamesData, setAllGamesData } = useContext(GameContext)
  const { currentUser } = useContext(UserContext)
  
  const [currentQ, setCurrentQ] = useState(data[Math.floor(Math.random()*20000)])

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

    const correct = isCorrect(newQandA)

    try {
      addDoc(colRef, {
        ...newQandA, user: currentUser.email, correct: correct, userDisplayName: currentUser.displayName
      })
      console.log('Document added: ', newQandA)
    } catch(err) {
      console.log(err)
    }
    
  }

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