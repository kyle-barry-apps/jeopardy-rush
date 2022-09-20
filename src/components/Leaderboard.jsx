
const Leaderboard = ({ displayLeaders, correctSort, attemptedSort, percentageSort, moneySort }) => {
  
  const mappedCorrect = correctSort.map((item, idx) => {
    return (
      <div key={idx} className="leaderboard-item-container">
        <span>{idx+1}</span>
        <span className="leaderboard-name">{item[0]}</span>
        <span className='leaderboard-number'>{item[1]}</span>
      </div>
    ) 
  })

  const mappedAttempted = attemptedSort.map((item, idx) => {
    return (
      <div key={idx} className="leaderboard-item-container">
        <span>{idx+1}</span>
        <span className="leaderboard-name">{item[0]}</span>
        <span className='leaderboard-number'>{item[1]}</span>
      </div>
    ) 
  }) 
  const mappedMoney = moneySort.map((item, idx) => {
    return (
      <div key={idx} className="leaderboard-item-container">
        <span>{idx+1}</span>
        <span className="leaderboard-name">{item[0]}</span>
        <span className='leaderboard-number'>${item[1]}</span>
      </div>
    ) 
  })

  const mappedPercentage = percentageSort.map((item, idx) => {
    return (
      <div key={idx} className="leaderboard-item-container">
        <span>{idx+1}</span>
        <span className="leaderboard-name">{item[0]}</span>
        <span className='leaderboard-number'>{isNaN(item[1]) ? 0 : item[1]}%</span>
      </div>
    ) 
  }) 

  
  if(displayLeaders === 'correct') {
    return mappedCorrect
  } else if(displayLeaders === 'attempted') {
    return mappedAttempted
  } else if(displayLeaders === 'percentage') {
    return mappedPercentage
  } else if(displayLeaders === 'money') {
    return mappedMoney
  } else {
    return 'No data found'
  }

}

export default Leaderboard