import '../App.css'
import { useState, useEffect } from 'react'
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

  const deleteMovement = (indexToDelete: number) => {
    const updatedData = savedData.filter((_, index) => index !== indexToDelete);
    localStorage.setItem('formData', JSON.stringify(updatedData));
    setSavedData(updatedData);
  };

  return (
    <>
      <MyHeader />
        {savedData.length > 0 ? (
          <table className='tableMoviments'>
            <thead>
              <tr>
                <th>FECHA</th>
                <th>CONCEPTO</th>
                <th>CATEGORÍA</th>
                <th>IMPORTE</th>
                <th>ACCIONES</th>
              </tr>
            </thead>

            <tbody>
            {savedData.map((item, index) => (
              <tr key={index}>
                <th>{item.date}</th>
                <th>{(item.concept).toUpperCase()}</th>
                <th>{(item.category).toUpperCase()}</th>
                <th className = {item.type === 'ingreso' ? 'ingreso' : 'gasto'}>{item.type === 'ingreso' ? '+' : '-'}{Number(item.amount).toFixed(2)}€</th>
                <th><button className='buttonDelet' onClick = {() => deleteMovement(index)}>ELIMINAR</button></th>
              </tr>
            ))}
            </tbody>

            <tfoot>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th>TOTAL {dinero.toFixed(2)}€</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        ) : (
          <p>No hay movimientos aún. Añade el primero.</p>
        )}
      <MyFooter />
    </>
  )
}

export default Home
