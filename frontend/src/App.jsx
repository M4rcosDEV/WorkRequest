import './App.css'
import StatusController from './components/StatusController/StatusController'
import { Routes, Route } from "react-router-dom";
import MainLayout from './layouts/MainLayout';
import PrioridadesController from './components/PrioridadesController/PrioridadesController'
import Solicitacoes from './components/Solicitacoes/Solicitacoes'
import RotasProtegidas from './components/RotasProtegidas/RotasProtegidas'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage';

function App() {

  return (
        <Routes>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/registrar" element={<RegisterPage/>} />

            <Route element={<RotasProtegidas/>}>

              {/* Define um layout padrão para as páginas */}
              <Route path="/" element={<MainLayout/>}>
                  <Route path="status" element={<StatusController />} />
                  <Route path="prioridades" element={<PrioridadesController/>} />
                  <Route path="solicitacoes" element={<Solicitacoes/>} />
                  {/* Adicionar mais rotas aqui conforme necessário */}
              </Route>

            </Route>

        </Routes>
  )
}

export default App
