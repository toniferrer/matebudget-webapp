import '../App.css'
import MyFooter from '../components/footer'
import MyHeader from '../components/header'
import Form from '../components/form'

function Home() {
  return (
    <>
      <MyHeader />
      <div className="card">
        <Form />
      </div>
      <MyFooter />
    </>
  )
}

export default Home
