import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from "react-router-dom";
import { OrbitProgress } from "react-loading-indicators";
import { Eye, Pencil } from "lucide-react";

export default function Solicitacoes() {
    const [isLoading, setIsLoading] = useState(false);
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [sortedSolicitacoes, setSortedSolicitacoes] = useState([]);

    const [dropdownOpen, setDropdownOpen] = useState(null);

    const toggleDropdown = (id) => {
        setDropdownOpen(dropdownOpen === id ? null : id);
    };

    const loadSolicitacoes = async () => {
        try {
            setIsLoading(true);
            const response = await api.get('/solicitacoes');
            //console.log(response);
            setSolicitacoes(response.data.solicitacoes);
        } catch (error) {
            
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        loadSolicitacoes();
    },[]);

    useEffect(() => {
        if (solicitacoes.length > 0) { 
            const sorted = [...solicitacoes].sort((a, b) => {
                const prioridadeOrder = { Alta: 1, Media: 2, Baixa: 3 };
                return prioridadeOrder[a.prioridade.relevancia] - prioridadeOrder[b.prioridade.relevancia];
            });
    
            setSortedSolicitacoes(sorted);
        }
    }, [solicitacoes]);
    
    console.log(sortedSolicitacoes[0]?.user.id);
    
    return (
        <div>
            <h1 className="text-2xl font-bold">Solicitações</h1>

            {isLoading ? (
                <div className='flex justify-center items-center h-screen'>
                    <OrbitProgress color="#333833" size="medium" text="" textColor="" />
                </div>
            ) : (
                <ul className="mt-4 space-y-4">
                    {sortedSolicitacoes.map((solicitacao) => {
                        const prioridadeClasses = {
                            Alta: "bg-red-100 border-red-500 text-red-800",
                            Media: "bg-yellow-100 border-yellow-500 text-yellow-800",
                            Baixa: "bg-green-100 border-green-500 text-green-800",
                        };
        
                        return (
                            <li
                                key={solicitacao.id}
                                className={`border p-4 rounded-lg shadow-md transition-transform transform hover:scale-[1.005] hover:shadow-lg ${prioridadeClasses[solicitacao.prioridade.relevancia]}`}
                            >
                                <div className="flex items-center justify-between">
                                    <strong className="text-lg">{solicitacao.titulo}</strong>
                                    <div className="relative">
                                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white border">
                                            {solicitacao.prioridade.relevancia.toUpperCase()}
                                        </span>
        
                                        {/* Verifica se a solicitação pertence ao usuário autenticado */}
                                       
                                            <button
                                                onClick={() => toggleDropdown(solicitacao.id)}
                                                className="ml-2 px-3 py-1 text-white text-xs rounded-md"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="black" /* Define a cor preta */
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className={`w-5 h-5 transition-transform duration-200 ${dropdownOpen === solicitacao.id ? "rotate-180" : ""}`}
                                                >
                                                    <path d="M6 9l6 6 6-6" />
                                                </svg>

                                            </button>
                                        
        
                                        {/* Dropdown de opções */}
                                        {dropdownOpen === solicitacao.id && (
                                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden animate-fade-in">
                                            <ul className="divide-y divide-gray-200">
                                                <li>
                                                    <Link
                                                        href="#"
                                                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200"
                                                    >
                                                        <Eye className="w-4 h-4 text-gray-600" />
                                                        <span>Visualizar</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="#"
                                                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200"
                                                    >
                                                        <Pencil className="w-4 h-4 text-gray-600" />
                                                        <span>Editar</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        )}
                                    </div>
                                </div>
        
                                <p className="text-gray-700 mt-2">{solicitacao.descricao}</p>
        
                                <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                                    <span className="font-medium">Status: {solicitacao.status.nome}</span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) }   
        </div>
    );
}