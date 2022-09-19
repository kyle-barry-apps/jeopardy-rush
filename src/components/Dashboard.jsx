import { useEffect, useContext, useState } from "react"
import { colRef } from "../firebase/Firebase"
import { getDocs, query, where } from "firebase/firestore"
import { UserContext } from "../contexts/UserContext"
import Navbar from "./Navbar"
import  Loading from './Loading'
import { createStats } from "../utils/createStats"
import { StarSharp } from "@material-ui/icons"

const Dashboard = () => {
  const { currentUser } = useContext(UserContext)
  const q = query(colRef, where('user', '==', currentUser))

  const [stats, setStats] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {   
    const data = [] 
    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push(doc.data())
          setLoading(false)
        })
        const {totalQuestions, correctAnswers, percentageCorrect, totalValue, valueCorrect } = createStats(data)
        setStats({totalQuestions, correctAnswers, percentageCorrect, totalValue, valueCorrect })
      }).catch((err) => {
        setError(err.message)
      })
  }, [])

  if(loading) {
    return (
      <Loading />
    )
  }

  return (
    <>
    <Navbar />
    <section className="dashboard">
      <div className="statistics-container">
        {stats ?
        <ul>
          <li>Questions Attempted: {stats.totalQuestions}</li>
          <li>Correct Answers: {stats.correctAnswers}</li>
          <li>Percentage Correct: {stats.percentageCorrect}%</li>
          <li>Money earned: ${stats.valueCorrect}</li>
        </ul>
        : <span>We have no data for you yet. Play some games!</span>}
      </div>
      <div className="leaderboard">

      </div>
    </section>
    </>
  )
}

export default Dashboard