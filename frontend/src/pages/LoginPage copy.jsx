import React,{ useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import api from '../services/api';
import workrequest from '../../public/workrequest.mp4'
import { OrbitProgress } from "react-loading-indicators";


export default function LoginPage() {
    const navigate = useNavigate();
    const email = 'gabi01@gmail.com';
    const password = 'gabi123';

    const login = async (email, password) => {
        try {
            const response = await api.post('/login', {email, password});

            if(response.data.token){
                localStorage.setItem('token', response.data.token);
                console.log(response.data.message);
                navigate('/status');
            }else {
                console.log("Erro ao fazer login");
            }
            
        } catch (error) {
            console.log('Credenciais inválidas!');
        }
    }

    // useEffect(()=>{
    //     login(email, password);
    // }, []);

    return(
        <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0 ">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-lg lg:max-w-6xl w-full h-2/3 outline outline-black/5"> 
            
        <div className="hidden md:flex lg:w-1/2 bg-cover border-r-1 border-gray-100 justify-center items-center">
            <video
                src={workrequest}
                autoPlay
                loop
                muted
            ></video>
        </div>

          <div className="w-full p-8 lg:w-1/2">
            <p className="text-xl text-gray-600 text-center">Bem vindo de volta!</p>
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
                  Password
                </label>
              </div>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="password"
              />
              <a
                href="#"
                className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
              >
                Forget Password?
              </a>
            </div>
            <div className="mt-8">
              <button className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
                Login
              </button>
            </div>
            <p className='text-center whitespace-nowrap text-gray-600 font-bold mt-2'>Ou </p>
            <a
              href="#"
              className=" flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100 outline outline-black/5"
            >
              <div className="flex px-5 justify-center w-full py-3">
                <div className="min-w-[30px]">
                  <svg className="h-6 w-6" viewBox="0 0 40 40">
                    <path
                      d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                      fill="#FFC107"
                    />
                    <path
                      d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                      fill="#FF3D00"
                    />
                    <path
                      d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                      fill="#4CAF50"
                    />
                    <path
                      d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                      fill="#1976D2"
                    />
                  </svg>
                </div>
                <div className="flex w-full justify-center ">
                  <h1 className="whitespace-nowrap text-gray-600 font-bold">
                    Faça login com o Google
                  </h1>
                </div>
              </div>
            </a>
            <div className="mt-4 flex items-center w-full text-center ">
              <a
                href="#"
                className="text-xs text-gray-500 text-center w-full"
              >
                Não tem uma conta ?
                <span onClick={()=> navigate('/registrar') } className="text-blue-700"> Registrar-se</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
}