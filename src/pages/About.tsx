import '../App.css'
import MyFooter from '../components/footer'
import MyHeader from '../components/header'

function About() {
  return (
    <>
      <MyHeader />
      <div className="card">
        <p>MateBudget es un poryecto creado por Toni Ferrer, totalmente gratuito.</p>
      </div>
      <MyFooter />
    </>
  )
}

export default About
