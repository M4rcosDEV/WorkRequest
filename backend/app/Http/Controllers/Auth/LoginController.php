<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credenciais = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if(Auth::attempt($credenciais)) {
            $token = $request->user()->createToken('Token Name')->plainTextToken;
            return response()->json(['message' => 'Login realizado com sucesso' ,'token' => $token], 200);
        }

        return response()->json(['error' => 'Credenciais inválidas'], 401);
    }
}
