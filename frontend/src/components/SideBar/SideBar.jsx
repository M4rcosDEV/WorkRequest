import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userPerfil from "../../assets/images/user.png";
import api from "../../services/api";

export default function SideBar({ closeSidebar }) {
  const [cadastrosOpen, setCadastrosOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  const [isLoading , setIsLoading] = useState(false);

  const dadosUser = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/perfil');
      console.log(response.data.user);
      setUserInfo(response.data.user);
    } catch (error) {
      console.log('Erro ao buscar dados do usuário', error);
    }finally{
      setIsLoading(false);
    }
  }

  const logout = async () => {
    try {
      const response = await api.get('/logout');
      console.log(response.data.message);
      navigate('/login');
    }catch (error) {
      console.log('Erro ao fazer logout', error);
    }
  }

  useEffect(()=>{
    dadosUser();
  }, []);

  return (
    <div className="fixed left-0 top-0 flex flex-col bg-white text-gray-700 h-screen w-[20rem] p-4 shadow-xl">
      {/* Botão de Fechar */}
      <button
        className="absolute top-4 right-4 p-2 rounded-md bg-white"
        onClick={closeSidebar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 6l12 12M18 6L6 18"
          />
        </svg>
      </button>

      {/* Usuário */}
      <div className="mb-5 p-4">
        <img
          src={userInfo?.photo_user}
          alt="Usuário"
          className="w-12 h-12 rounded-full mx-auto mb-4"
        />
        <div className="flex flex-col items-center justify-center">
          {!isLoading ? (
            <>
              <h5 className="block font-sans text-xl text-center text-gray-900">
                {userInfo?.name}
              </h5>
              <h5 className="block font-sans text-xl text-center text-gray-900">
                {userInfo?.email}
              </h5>
            </>
          ) : (
            // <div className="text-center text-gray-500">Carregando...
            <span className="loader mt-7"></span>
            //</div>
            
          )}
        </div>
        <hr className="mt-5" />
      </div>

      {/* Navegação */}
      <nav className="flex flex-col gap-2 min-w-[240px] p-2 text-gray-700">
        {/* Dashboard */}
        <Link
          to="/dashboard"
          className="flex items-center w-full p-3 rounded-lg text-start transition-all hover:bg-blue-50 hover:text-blue-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          Dashboard
        </Link>

        {/* Minhas Solicitações */}
        <Link
          to="/solicitacoes"
          className="flex items-center w-full p-3 rounded-lg text-start transition-all hover:bg-blue-50 hover:text-blue-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
            <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
          </svg>
          Minhas Solicitações
        </Link>

        {/* Dropdown de Cadastros */}
        {/* {user?.is_admin && ( */}
          <div className="relative">
            <button
              onClick={() => setCadastrosOpen(!cadastrosOpen)}
              className="flex items-center justify-between w-full p-3 rounded-lg border-0 transition-all hover:bg-blue-100 hover:text-blue-900 font-medium focus:outline-none focus:ring-0 focus:ring-offset-0"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className={`w-6 h-6 mr-2 transition-transform duration-300 ${
                    cadastrosOpen ? "rotate-180 text-blue-600" : ""
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Cadastros
              </div>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                cadastrosOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="flex flex flex-col items-start ml-6">
                <Link
                  to="/status"
                  className="p-2 pl-3 w-[100%] rounded-md hover:bg-blue-50 hover:text-blue-900 transition-all"
                >
                  Status
                </Link>
                <Link
                  to="/prioridades"
                  className="p-2 pl-3 w-[100%] rounded-md hover:bg-blue-50 hover:text-blue-900 transition-all"
                >
                  Prioridade
                </Link>
              </div>
            </div>
          </div>
        {/* )} */}

        {/* Link para Relatórios */}
        <Link
          to="/relatorios"
          className="flex items-center w-full p-3 rounded-lg text-start transition-all hover:bg-blue-50 hover:text-blue-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3"
            />
          </svg>
          Relatórios
        </Link>

        {/* Logout */}
        <button onClick={logout} className="flex items-center w-full p-3 rounded-lg text-start transition-all hover:bg-red-50 hover:text-red-900">
          Sair
        </button>
      </nav>
    </div>
  );
}
