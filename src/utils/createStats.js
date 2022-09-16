export const createStats = (gameData) => {
  const totalQuestions = gameData.length
  let correctAnswers = 0
  let totalValue = 0
  let valueCorrect = 0


  for(const q of gameData) {
    totalValue += q.value_int

    const acceptableAnswers = []
    for(const answer of q.acceptable_answer) {
      acceptableAnswers.push(answer.toLowerCase())
    }


    if(acceptableAnswers.includes(q.answer)) {
      correctAnswers += 1
      valueCorrect += q.value_int
    }

  }

  let percentageCorrect = Math.round(correctAnswers/totalQuestions * 100)
  if(percentageCorrect === 'NaN' || isNaN(percentageCorrect)) {
    percentageCorrect = 0
  }

  return { totalQuestions, correctAnswers, percentageCorrect, totalValue, valueCorrect }


}