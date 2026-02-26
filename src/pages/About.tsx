import '../App.css'
import MyFooter from '../components/footer'
import MyHeader from '../components/header'

function About() {
  const deleteAllMoviments = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <>
      <MyHeader />
      <div className="card">
        <p>MateBudget Alpha es un poryecto creado por Toni Ferrer y de uso totalmente gratuito.</p>
        <button onClick={deleteAllMoviments}>Borrar todos los movimientos</button>
      </div>
      <MyFooter />
    </>
  )
}

export default About
