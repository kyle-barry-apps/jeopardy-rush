import Navbar from "../components/Navbar"

const About = () => {
  return (
    <>
    <Navbar />
    <section className="about-container">
      <h1>About Jeopardy Rush</h1>
      <p className="main-about-paragraph">Jeopardy Rush is a speed trivia game based on <span style={{fontWeight: 500, color: '#007BE0'}}>Jeopardy!</span> questions from <a style={{textDecoration: 'none'}} href="https://j-archive.com/" target='_blank'>j-archive</a>. It is built on <span style={{fontWeight: 500, color: '#007BE0'}}>React</span> and uses <span style={{fontWeight: 500, color: '#007BE0'}}>Firebase</span> for user authentication and storing data.</p>
      <p>Developed by <span>Kyle Barry</span></p>
      <p>Contact me at <span>webdev.ksb@gmail.com</span></p> 
    </section>
    </>
  )
}

export default About