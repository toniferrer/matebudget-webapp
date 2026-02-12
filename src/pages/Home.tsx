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
      return item.type === 'ingreso' ? acc + Number(item.amount) : acc - Number(item.amount);
    }, 0);
    setDinero(total);
  }, [savedData]);

  return (
    <>
      <MyHeader />
        <h2>Movimientos</h2>
        {savedData.length > 0 ? (
          <table className='tableMoviments'>
            <thead>
              <tr>
                <th>Importe</th>
                <th>Concepto</th>
                <th>Categoría</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
            {savedData.map((item, index) => (
              <tr key={index}>
                <th>{Number(item.amount).toFixed(2)} € {item.type}</th>
                <th>{item.concept}</th>
                <th>{item.category}</th>
                <th>{item.date}</th>
              </tr>
            ))}
            </tbody>
            <tfoot>
              <tr>
                <th>{dinero.toFixed(2)} €</th>
              </tr>
            </tfoot>
          </table>
        ) : (
          <p>No hay movimientos aún. Añade el primero.</p>
        )}
        <button className='buttonDelet' onClick={() =>
        localStorage.removeItem('formData')
        }>
        Eliminar todos los movimientos
        </button>
      <MyFooter />
    </>
  )
}

export default Home
