<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{

    public function perfil(Request $request)
    {
        return response()->json([
            'user' => $request->user() // Retorna os dados do usuário autenticado
        ]);
    }
    
    //Funcao para registrar um novo usuario
    public function criarUser(Request $request)
    {
        try{
            //Validacao das informações da entrada
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:4',
            ]);

            //Insercao do usuario no banco
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ]);

            //Log de confirmacao da criacao do usuario
            \Log::info('Usuario criado com sucesso!');

            //Retorno a resposta do JSON - SUCESS
            return response()->json([
                'message' => 'Usuário criado com sucesso',
                'user' => $user,
            ], 201);

        }catch(\Exception $e){
            //Log de erro da criacao do usuario
            \Log::error('Erro ao criar Usuario: ' . $e->getMessage());

            //Retorno a resposta do JSON - ERROR
            return response()->json(['message' => 'Error ao criar Usuario'], 500);
        }
    }  
}
