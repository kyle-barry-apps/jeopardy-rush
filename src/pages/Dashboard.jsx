import { useEffect, useContext, useState } from "react"
import { auth, colRef } from "../firebase/Firebase"
import { getDocs, query, where } from "firebase/firestore"
import { UserContext } from "../contexts/UserContext"
import Navbar from "../components/Navbar"
import  Loading from '../components/Loading'
import Error from '../components/Error'
import { createStats, createLeaderboard } from "../utils/createStats"
import Leaderboard from "../components/Leaderboard"
import { GiPodiumWinner } from 'react-icons/gi'
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth"

const Dashboard = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext)

  const q = query(colRef, where('user', '==', currentUser ? currentUser.email : ''))
  const [stats, setStats] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  const [attemptedSort, setAttemptedSort] = useState()
  const [correctSort, setCorrectSort] = useState()
  const [percentageSort, setPercentageSort] = useState()
  const [moneySort, setMoneySort] = useState()
  const [displayLeaders, setDisplayLeaders] = useState('correct')


  useEffect(() => {
    const userCount = {}
    getDocs(colRef)
      .then((totalDocs) => {
       const { sortedAttempted, sortedCorrect, sortedPercentage, sortedMoney } = createLeaderboard(totalDocs)
       setAttemptedSort(sortedAttempted)
       setCorrectSort(sortedCorrect)
       setPercentageSort(sortedPercentage)
       setMoneySort(sortedMoney)
      }).catch((err) => console.log(err.message))
  }, [])

  useEffect(() => {   
    const data = [] 
    if (currentUser) {
      getDocs(q)
        .then((querySnapshot) => {
          if(!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              data.push(doc.data())
              setLoading(false)
            })
            const {totalQuestions, correctAnswers, percentageCorrect, totalValue, valueCorrect } = createStats(data)
            setStats({totalQuestions, correctAnswers, percentageCorrect, totalValue, valueCorrect })
          } else {
            setLoading(false)
          }
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

  const displayName = currentUser.displayName ? currentUser.displayName : currentUser.email

  return (
    <>
    <Navbar />
    <section className="dashboard">
      <div className="statistics-container">
        {stats ?
        <>
        <h1>{displayName}'s Stats</h1>
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
        <div className="leaderboard-title-container">
          <GiPodiumWinner size={26}/>
          <h1>Leaderboard</h1>
        </div>

        <div className="leaderboard-tabs">
          <button className={displayLeaders === 'correct' ? 'active' : ''} onClick={() => setDisplayLeaders('correct')}>Most Correct</button>
          <button className={displayLeaders === 'percentage' ? 'active' : ''} onClick={() => setDisplayLeaders('percentage')}>Percentage Correct</button>
          <button className={displayLeaders === 'money' ? 'active' : ''} onClick={() => setDisplayLeaders('money')}>Money Earned</button>
        </div>

        <Leaderboard 
          displayLeaders={displayLeaders} 
          attemptedSort={attemptedSort} 
          correctSort={correctSort} 
          percentageSort={percentageSort}
          moneySort={moneySort}
        />
      </div>

    </section>
    </>
  )
}

export default Dashboard