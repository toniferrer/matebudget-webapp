import { useState} from 'react';

interface FormData {
  type: string;
  amount: number;
  concept: string;
  category: string;
  date: string;
}

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    type: 'gasto',
    amount: 0,
    concept: '',
    category: 'Ninguna',
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
      amount: 0,
      concept: '',
      category: '',
      date: '',
    });
    window.location.reload()
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
                value={Number(formData.amount)}
                onChange={handleChange}
                required
                />
                <p>€</p>
            </div>
            <div>
                <label>Concepto</label>
                <input
                type="text"
                name="concept"
                value={(formData.concept).toUpperCase()}
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
                    <option value="Supermercado">Supermercado</option>
                    <option value="Ocio">Ocio</option>
                    <option value="Ninguna">Ninguna</option>
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