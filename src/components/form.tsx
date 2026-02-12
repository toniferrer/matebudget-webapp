import { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    type: '',
    import: '',
    concept: '',
    category: 'ninguna',
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
    localStorage.setItem('formData', JSON.stringify(formData));
    alert('Datos guardados en el navegador');
  };

    return(
        <div className="form">
            <form onSubmit={handleSubmit}>
            <div>
                <label>Tipo</label>
                <input
                type="select"
                name="type"
                value={formData.type}
                onChange={handleChange}
                />
            </div>
            <div>
                <label>Importe</label>
                <input
                type="number"
                name="import"
                value={formData.import}
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
            <button type="submit">Añadir</button>
            </form>
        </div>
    );
};

export default Form