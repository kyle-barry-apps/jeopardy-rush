import { useEffect, useContext, useState } from "react"
import { colRef } from "../firebase/Firebase"
import { getDocs, query, where } from "firebase/firestore"
import { UserContext } from "../contexts/UserContext"
import Navbar from "./Navbar"
import  Loading from './Loading'
import Error from './Error'
import { createStats, createLeaderboard } from "../utils/createStats"

const Dashboard = () => {
  const { currentUser } = useContext(UserContext)

  const q = query(colRef, where('user', '==', currentUser ? currentUser.email : ''))
  const [stats, setStats] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()



  useEffect(() => {
    const userCount = {}
    getDocs(colRef)
      .then((totalDocs) => {
        createLeaderboard(totalDocs)
      }).catch((err) => console.log(err.message))
  }, [])

  useEffect(() => {   
    const data = [] 
    if (currentUser) {
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
    }
  }, [])

  if(loading) {
    return (
      <Loading />
    )
  }

  if(error) {
    <Error errorMessage={error}/>
  }

  return (
    <>
    <Navbar />
    <section className="dashboard">
      <div className="statistics-container">
        {stats ?
        <>
        <h1>{currentUser ? currentUser.displayName.split(' ')[0] : ''}'s Stats</h1>
        <ul>
          <li>Questions Attempted: <span className="stat">{stats.totalQuestions}</span></li>
          <li>Correct Answers: <span className="stat">{stats.correctAnswers}</span></li>
          <li>Percentage Correct: <span className="stat">{stats.percentageCorrect}%</span></li>
          <li>Money earned: <span className="stat">${stats.valueCorrect}</span></li>
        </ul>
        </>
        : <span>We have no data for you yet. Play some games!</span>}
      </div>
      <div className="leaderboard">
        <h1>Leaderboard</h1>

      </div>
    </section>
    </>
  )
}

export default Dashboard