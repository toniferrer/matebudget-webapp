import '../App.css'
import { useState, useEffect } from 'react';
import MyFooter from '../components/footer'
import MyHeader from '../components/header'

interface FormData {
  type: string;
  amount: number;
  concept: string;
  category: string;
  date: string;
}

function Home() {
  const [savedData, setSavedData] = useState<FormData[]>([]);
  const [dinero, setDinero] = useState(0);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('formData') || '[]') as FormData[];
    setSavedData(data);
  }, []);

  useEffect(() => {
    const total = savedData.reduce((acc, item) => {
      return item.type === 'ingreso' ? acc + item.amount : acc - item.amount;
    }, 0);
    setDinero(total);
  }, [savedData]);

  return (
    <>
      <MyHeader />
        <h2>Movimientos</h2>
        {savedData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Importe</th>
                <th>Concepto</th>
                <th>Categoría</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
            {savedData.map((item, index) => (
              <tr key={index}>
                <th>{item.type}</th>
                <th>{item.amount}€</th>
                <th>{item.concept}</th>
                <th>{item.category}</th>
                <th>{item.date}</th>
              </tr>
            ))}
              <tr>
                <th></th>
                <th>{dinero}€</th>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>No hay movimientos aún. Añade el primero.</p>
        )}
        <button onClick={() =>
        localStorage.removeItem('formData')
        }>
        Eliminar todos los movimientos
        </button>
      <MyFooter />
    </>
  )
}

export default Home
