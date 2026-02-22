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
  const [totalCategoria, setTotalCategoria] = useState(0);

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

  useEffect(() => {
    let aux = 0;
    savedData.forEach((item) => {
      if(item.category === 'Supermercado') {
        aux += item.type === 'ingreso' ? Number(item.amount) : - Number(item.amount);
      }
    });
    setTotalCategoria(aux);
  }, [savedData]);

  const deleteMovement = (indexToDelete: number) => {
    const updatedData = savedData.filter((_, index) => index !== indexToDelete);
    localStorage.setItem('formData', JSON.stringify(updatedData));
    setSavedData(updatedData);
  };

  return (
    <>
      <MyHeader />
      <div className='body'>
        {savedData.length > 0 ? (
          <table className='tableMoviments'>
            <tbody>
            {savedData.map((item, index) => (
              <tr key={index}>
                <th>{item.date}</th>
                <th>{(item.concept).toUpperCase()}</th>
                <th>{(item.category).toUpperCase()}</th>
                <th className = {item.type === 'ingreso' ? 'ingreso' : 'gasto'}>{item.type === 'ingreso' ? '+' : '-'}{Number(item.amount).toFixed(2)}€</th>
                <th><button className='buttonDelet' onClick = {() => deleteMovement(index)}>🗑️</button></th>
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

        <div className='rightCard'>
        <h4>Categorías</h4>
        <table>
          <tr>
            <th>Supermercado {Number (totalCategoria).toFixed(2)}€</th>
          </tr>
          <tr>
            <th>Ocio {Number (0).toFixed(2)}€</th>
          </tr>
          <tr>
            <th>Otros {Number (0).toFixed(2)}€</th>
          </tr>
        </table>
        </div>

        </div>
      <MyFooter />
    </>
  )
}

export default Home
