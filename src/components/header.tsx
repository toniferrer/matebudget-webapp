import { Link } from 'react-router-dom';

function MyHeader(){
    return(
        <div className="header">
            <Link to="/"><h1>MateBudget</h1></Link>
            <button>Nuevo movimiento</button>
        </div>
    )
}

export default MyHeader