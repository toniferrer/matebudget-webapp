import '../App.css'
import { useState, useEffect } from 'react';
import MyFooter from '../components/footer'
import MyHeader from '../components/header'

interface FormData {
  type: string;
  amount: string;
  concept: string;
  category: string;
  date: string;
}

function Home() {
  const [savedData, setSavedData] = useState<FormData[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('formData') || '[]') as FormData[];
    setSavedData(data);
  }, []);

  return (
    <>
      <MyHeader />
      <div className="card">
        <h2>Movimientos</h2>
        {savedData.length > 0 ? (
          <ul>
            {savedData.map((item, index) => (
              <li key={index}>
                {item.type}  {item.amount}€  {item.concept}  {item.category}  {item.date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay movimientos guardados.</p>
        )}
        <button onClick={() =>
        localStorage.removeItem('formData')
        }>
        Eliminar todos los movimientos
        </button>
      </div>
      <MyFooter />
    </>
  )
}

export default Home
