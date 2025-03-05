import React from 'react';
import api from '../../services/api';
import { useEffect, useState } from 'react';
import { OrbitProgress } from "react-loading-indicators";


export default function StatusController() {
    const [status, setStatus] = useState([]);
    const [statusNome, setStatusNome] = useState('');
    const [statusAdd, setStatusAdd] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [deleteStatus , setDeleteStatus] = useState(null);

    const loadStatus = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/status');
            setStatus(response.data.status);
        } catch (error) {
            console.error("Erro ao buscar status:", error);
        }finally{
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        loadStatus();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita recarregar a página
        setIsSubmitting(true);
        try {
            if (editingId) {
                // Atualizar um status existente
                await api.put(`/status/${editingId}`, { nome: statusNome });
                setEditingId(null); // Sai do modo de edição
            } else {
                // Criar um novo status
                await api.post('/status', { nome: statusNome });
            }
            
            setStatusNome(""); // Limpa o campo de input
            loadStatus(); // Recarrega a lista de status
        } catch (error) {
            console.error("Erro ao salvar status:", error);
        }finally{
            setIsSubmitting(false);
        }
    };

    const handleEdit = (statusItem) => {
        setEditingId(statusItem.id);
        setStatusNome(statusItem.nome); // Preenche o formulário com o nome do status
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setStatusNome(""); // Reseta o formulário
    };

    const handleDelete = async (id) => {
        if(confirm("Tem certeza que deseja excluir?")){
            setDeleteStatus(id);
            try {
                await api.delete(`/status/${id}`);
                loadStatus(); // Atualiza a lista após deletar
            } catch (error) {
                console.error("Erro ao excluir status:", error);
            }finally{
                //setDeleteStatus(null);
            }
        }
    };
    

    return(
        <div>
            {/* {isLoading ? (
                <div className='flex justify-center items-center h-screen'>
                    <OrbitProgress color="#333833" size="medium" text="" textColor="" />
                </div>
            ) : null } */}

            {/* Formulário de Cadastro/Edição */}
            <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
                <input 
                    type="text" 
                    value={statusNome} 
                    onChange={(e) => setStatusNome(e.target.value)} 
                    placeholder="Novo status"
                    className="border px-3 py-2 rounded-md"
                    required
                />
                <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className={`px-4 py-2 rounded-md ${editingId ? "bg-green-500" : "bg-blue-500"} text-white flex items-center gap-2`}
                >
                    {isSubmitting ? (
                        <>
                            <span className="loader"></span> {/* Pode ser um spinner CSS */}
                            {editingId ? "Salvando..." : "Adicionando..."}
                        </>
                    ) : (
                        editingId ? "Salvar" : "Adicionar"
                    )}
                </button>

                {editingId && (
                    <button type="button" onClick={handleCancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded-md">
                        Cancelar
                    </button>
                )}
            </form>

            <div className="overflow-x-auto">
            <div className="border border-gray-300 overflow-hidden w-1/2">
            {status.length > 0 ? (
                                <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 border-b">
                                        <th className="px-4 py-2 text-gray-600 border border-gray-300 text-center">Status</th>
                                        <th className="px-4 py-2 text-gray-600 border border-gray-300 text-center">Editar</th>
                                        <th className="px-4 py-2 text-gray-600 border border-gray-300 text-center">Excluir</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {status.map((item, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-50">
                                            {deleteStatus === item.id ? (
                                                <td
                                                colSpan="3"
                                                className="px-4 py-2 text-center text-red-500 font-semibold bg-red-100 border border-red-300 rounded-md fade-out"
                                              >
                                                Deletando...
                                              </td>
                                            ):(
                                                <>
                                                    <td className="px-4 py-2 border border-gray-300 text-center">{item.nome}</td>
                                                    <td className="px-4 py-2 border border-gray-300 text-center">
                                                        <button onClick={() => handleEdit(item)} className="text-blue-500 hover:text-blue-700">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.25 2.25 0 0 1 3.182 3.182L8.17 18.543a4.5 4.5 0 0 1-1.91 1.14l-3.206.902a.75.75 0 0 1-.924-.923l.902-3.206a4.5 4.5 0 0 1 1.14-1.91L16.862 3.487z" />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                    <td className="px-4 py-2 border border-gray-300 text-center">
                                                        <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </>

                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
            ) : (
                <>
                    {isLoading ? (
                        <div className="flex justify-center items-center py-4">
                            <div className="loader"></div>
                            {/* <span className="text-gray-500 text-lg font-semibold animate-pulse">
                                Carregando...
                            </span> */}
                        </div>
                    ) : (
                        <div className="flex justify-center items-center py-4">
                            <span className="text-gray-400 text-lg font-medium">
                                Nenhum status cadastrado
                            </span>
                        </div>
                    )}
                </>
                
            )}

            </div>
        </div>
        </div>
    );
}