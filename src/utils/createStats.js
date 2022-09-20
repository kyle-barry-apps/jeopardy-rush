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

export const isCorrect = (QandA) => {
  const answers_lowered = QandA.acceptable_answers.map((a) => a.toLowerCase())
  if(answers_lowered.includes(QandA.answer)) {
    return true
  }
  return false
}

export const createLeaderboard = (docs) => {

  const questionsAttempted = {}
  const correctAnswers = {}
  const percentageCorrect = {}
  const totalMoney = {}

  docs.forEach((doc) => {
    const user = doc.data().user

    if(questionsAttempted.hasOwnProperty(user)) {
      questionsAttempted[user] += 1
    } else {
      questionsAttempted[user] = 1
    }

    if(doc.data().correct) {
      if(correctAnswers.hasOwnProperty(user)) {
        correctAnswers[user] += 1
      } else {
        correctAnswers[user] = 1
      }
    }

    if(doc.data().correct) {
      if(totalMoney.hasOwnProperty(user)) {
        totalMoney[user] += doc.data().value_int
      } else {
        totalMoney[user] = doc.data().value_int
      }
    } 
  })

  for(const user of Object.keys(questionsAttempted)) {
    percentageCorrect[user] = Math.round(correctAnswers[user] / questionsAttempted[user]*100)
  }

  let sortablePercentage = []
  for (const user of Object.keys(percentageCorrect)) {
    sortablePercentage.push([user, percentageCorrect[user]])
  }

  const sortedPercentage = sortablePercentage.sort((a,b) => {
    return b[1] - a[1]
  }).slice(0,10)

  let sortableCorrect = []
  for (const user of Object.keys(correctAnswers)) {
    sortableCorrect.push([user, correctAnswers[user]])
  }

  const sortedCorrect = sortableCorrect.sort((a,b) => {
    return b[1] - a[1]
  }).slice(0,10)

  let sortableAttempted = []
  for (const user of Object.keys(questionsAttempted)) {
    sortableAttempted.push([user, questionsAttempted[user]])
  }

  const sortedAttempted = sortableAttempted.sort((a,b) => {
    return b[1] - a[1]
  }).slice(0,10)

  let sortableMoney = []
  for (const user of Object.keys(totalMoney)) {
    sortableMoney.push([user, totalMoney[user]])
  }

  const sortedMoney = sortableMoney.sort((a,b) => {
    return b[1] - a[1]
  }).slice(0,10)

  return { sortedAttempted, sortedCorrect, sortedPercentage, sortedMoney }

}