export const createStats = (gameData) => {
  const totalQuestions = gameData.length
  let correctAnswers = 0
  let totalValue = 0
  let valueCorrect = 0

  const copyGameData = gameData


  for(const [i, q] of gameData.entries()) {
    totalValue += q.value_int

    const acceptableAnswers = []
    for(const answer of q.acceptable_answers) {
      acceptableAnswers.push(answer.toLowerCase())
    }


    if(acceptableAnswers.includes(q.answer)) {
      correctAnswers += 1
      valueCorrect += q.value_int
      copyGameData[i].correct = true
    } else 
    {copyGameData[i].correct = false}

  }

  let percentageCorrect = Math.round(correctAnswers/totalQuestions * 100)
  if(percentageCorrect === 'NaN' || isNaN(percentageCorrect)) {
    percentageCorrect = 0
  }

  return { copyGameData, totalQuestions, correctAnswers, percentageCorrect, totalValue, valueCorrect }


}