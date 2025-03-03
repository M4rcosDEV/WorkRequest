import React,{ useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import api from '../services/api';
import workrequest from '../../public/workrequest.mp4'
import { OrbitProgress } from "react-loading-indicators";


export default function RegisterPage() {
    const navigate = useNavigate();
    const email = 'gabi01@gmail.com';
    const password = 'gabi123';

    // const login = async (email, password) => {
    //     try {
    //         const response = await api.post('/login', {email, password});

    //         if(response.data.token){
    //             localStorage.setItem('token', response.data.token);
    //             console.log(response.data.message);
    //             navigate('/status');
    //         }else {
    //             console.log("Erro ao fazer login");
    //         }
            
    //     } catch (error) {
    //         console.log('Credenciais inválidas!');
    //     }
    // }

    // useEffect(()=>{
    //     login(email, password);
    // }, []);

    return(
        <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0 ">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-lg lg:max-w-6xl w-full h-2/3 outline outline-black/5"> 

          <div className="w-full p-8 lg:w-1/2">
            <p className="text-xl text-gray-600 text-center">Seja Bem vindo!</p>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nome
              </label>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="text"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="email"
                required
              />
            </div>
            <div className="mt-4 flex flex-col justify-between">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Senha
                </label>
              </div>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="password"
              />

            </div>

            <div className="mt-4 flex flex-col justify-between">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Confirmar Senha
                </label>
              </div>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="password"
              />
              
            </div>
            <div className="mt-8">
              <button className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
                Registrar
              </button>
            </div>
            <div className="mt-4 flex items-center w-full text-center ">
              <a
                href="#"
                className="text-xs text-gray-500 text-center w-full"
              >
                Já tem uma conta ?
                <span onClick={()=> navigate('/login') } className="text-blue-700"> Fazer login</span>
              </a>
            </div>
          </div>
          <div className="hidden md:flex lg:w-1/2 bg-cover border-r-1 border-gray-100 justify-center items-center">
            <video
                src={workrequest}
                autoPlay
                loop
                muted
            ></video>
        </div>
        </div>
      </div>
    );
}