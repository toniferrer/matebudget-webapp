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
    type: '',
    amount: '',
    concept: '',
    category: 'ninguna',
    date: '',
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
                <label>Tipo</label>
                <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                />
            </div>
            <div>
                <label>Importe</label>
                <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                />
            </div>
            <div>
                <label>Concepto</label>
                <input
                type="text"
                name="concept"
                value={formData.concept}
                onChange={handleChange}
                />
            </div>
            <div>
                <label>Categoría</label>
                <select
                name="category"
                value={formData.category}
                onChange={handleChange}
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
                onChange={handleChange}/>
            </div>
            <button type="submit">Añadir</button>
            </form>
        </div>
    );
};

export default Form