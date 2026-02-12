import { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from './form';

function MyHeader(){
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return(
        <>
        <div className="header">
            <Link to="/"><h1>MateBudget</h1></Link>
            <button onClick={toggleForm}>Nuevo movimiento</button>
        </div>
            {showForm && <Form />}
        </>
    )
}

export default MyHeader