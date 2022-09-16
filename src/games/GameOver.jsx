import { createStats } from "../utils/createStats"
import GameContext from "../contexts/GameContext"
import GameMode from "./GameMode"
import { BsArrowDownShort, BsArrowUpShort } from 'react-icons/bs'
import { useContext, useState } from "react"

const GameOver = () => {
  const [revealAnswers, setRevealAnswers] = useState(false)
  const { replay, setReplay, setGameStarted, setShowResults, currentGameData, setCurrentGameData } = useContext(GameContext)

  const { totalQuestions, correctAnswers, percentageCorrect, totalValue, valueCorrect } = createStats(currentGameData)

  const replayGame = () => {
    setGameStarted(false)
    setReplay(replay + 1)
    setShowResults(false)
    setCurrentGameData([])
    setGameStarted(true)
  }

  const mappedAnswers = currentGameData.map((curr, idx) => {
      return (
        <div key={idx} className="mapped-answer-container">
          <span>{curr.question}</span>
          <span>Correct Answer: {curr.acceptable_answer[0]}</span>
          <span>Your Answer: {curr.answer}</span>
        </div>
      )})
    

  return (
    <div className="game-results">
      <h1>GAME OVER</h1>
      <div className="results-container">
        <span>Correct Answers: {correctAnswers} / {totalQuestions}</span>
        <span>Percentage Correct: {percentageCorrect}%</span>
        <span>Money earned: ${valueCorrect} / {totalValue} </span>
        <button onClick={() => setRevealAnswers(!revealAnswers)} className='reveal-btn'>See Answers{!revealAnswers ?<BsArrowDownShort size={24}/> : <BsArrowUpShort size={24} />}</button>
        {revealAnswers && mappedAnswers}
        <button onClick={replayGame} className="btn">REPLAY</button>
      </div>
    </div>
  )

}

export default GameOver