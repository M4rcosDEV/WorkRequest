import {Navigate, Outlet} from 'react-router-dom';
import { isAutenticado } from '../../hooks/auth';

const RotasProtegidas = () => {
    return isAutenticado() ? <Outlet /> : <Navigate to="/login" />;
}

export default RotasProtegidas;         