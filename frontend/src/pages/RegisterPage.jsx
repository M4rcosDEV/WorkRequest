import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import workrequest from '../assets/workrequest.mp4';
import { motion } from "framer-motion";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <motion.div 
            initial={{ opacity: 0, x: 100 }}  // Inicia vindo da direita
            animate={{ opacity: 1, x: 0 }}  // Fica visível
            exit={{ opacity: 0, x: -100 }}  // Sai para a esquerda
            transition={{ duration: 0.5 }}  
            className="flex items-center justify-center h-screen w-full px-5 sm:px-0 "
        >
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-lg lg:max-w-6xl  w-full h-4/5 outline outline-black/5"> 
                <div className="w-full p-8 lg:w-1/2 border-r-1 border-gray-100">
                    <p className="text-xl text-gray-600 text-center">Seja Bem vindo!</p>
                    
                    {/* CAMPOS DO FORM */}
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Nome</label>
                        <input 
                            onChange={(event)=> setName(event.target.value)} 
                            value={name}
                            className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                            placeholder='Seu nome'
                            type="text" 
                            required />
                    </div>
                    
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input 
                        onChange={(event)=> setEmail(event.target.value)}
                        value={email}
                        className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700" type="email" required />
                    </div>

                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Senha</label>
                        <input className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700" type="password" required />
                    </div>

                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Confirmar Senha</label>
                        <input className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700" type="password" required />
                    </div>

                    <div className="mt-8">
                        <button className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
                            Registrar
                        </button>
                    </div>

                    <div className="mt-4 flex items-center w-full text-center">
                        <div className="text-xs text-gray-500 text-center w-full">
                            Já tem uma conta ?
                            <span 
                                onClick={() => navigate('/login')} 
                                className="text-blue-700 cursor-pointer ml-1"
                            > Fazer login</span>
                        </div>
                    </div>
                </div>

                {/* ANIMAÇÃO DO VÍDEO */}
                <div className="hidden md:flex lg:w-1/2 bg-cover border-r-1 border-gray-100 justify-center items-center">
                    <video src={workrequest} autoPlay loop muted></video>
                </div>
            </div>
        </motion.div>
    );
}
