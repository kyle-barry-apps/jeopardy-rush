import Navbar from "../components/Navbar"

const BestPractices = () => {

  return (
    <>
    <Navbar />
    <section className="best-practices-container">
      <h1>How to Use Jeopardy Rush</h1>
      <ul className="best-practices-list">
        <li>Capitalization <span>does not matter</span> at all</li>
        <li>While we have done our best to capture close answers, <span>spelling does count</span></li>
        <li>You can <span>pass</span> on a question by hitting enter, but it will count as incorrect when calculating your percentage correct</li>
        <li>If the answer is a name, you can respond with <span>only the last name</span></li>
        <li>Pay attention to the <span>category</span> listed within the question box. It will be very helpful</li>
      </ul> 
    </section>
    </>
  )
}

export default BestPractices