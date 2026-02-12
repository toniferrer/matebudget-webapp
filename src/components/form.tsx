import { useState} from 'react';

interface FormData {
  type: string;
  amount: string;
  concept: string;
  category: string;
  date: string;
}

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    type: 'gasto',
    amount: '',
    concept: '',
    category: 'ninguna',
    date: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existingData = JSON.parse(localStorage.getItem('formData') || '[]');
    const updatedData = [...existingData, formData];
    localStorage.setItem('formData', JSON.stringify(updatedData));
    setFormData({
      type: '',
      amount: '',
      concept: '',
      category: 'ninguna',
      date: '',
    });
    alert('Datos guardados en el navegador');
  };

    return(
        <div className="form">
            <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <label>
                    <input
                        type="radio"
                        name="type"
                        value="ingreso"
                        checked={formData.type === 'ingreso'}
                        onChange={handleChange}
                    />
                    Ingreso
                    </label>
                    <label>
                    <input
                        type="radio"
                        name="type"
                        value="gasto"
                        checked={formData.type === 'gasto'}
                        onChange={handleChange}
                    />
                    Gasto
                    </label>
                </div>
            </div>
            <div>
                <label>Importe</label>
                <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label>Concepto</label>
                <input
                type="text"
                name="concept"
                value={formData.concept}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label>Categoría</label>
                <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                >
                    <option value="supermercado">Supermercado</option>
                    <option value="ocio">Ocio</option>
                    <option value="ninguna">Ninguna</option>
                </select>
            </div>
            <div>
                <label>Fecha</label>
                <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                />
            </div>
            <button type="submit">Añadir</button>
            </form>
        </div>
    );
};

export default Form