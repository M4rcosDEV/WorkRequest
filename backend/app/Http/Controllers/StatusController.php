<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Status;

class StatusController extends Controller
{
    public function index()
    {
        try{
            $status = Status::all();
            \Log::info('Status:', $status->toArray());
            return response()->json(['message' => 'Consulta realizada', 'status' => $status], 200);
        }catch(\Exception $e){
            \Log::error('Error:', $e->getMessage());
            return response()->json(['message' => 'Error ao realizar consulta'], 500);
        }
    }

    public function criarStatus(Request $request)
    {
        try{
            $request->validate([
                'nome' => 'required|string|max:255',
            ]);

            $status = Status::create([
                'nome' => $request->nome,
            ]);
            \Log::info('Status criado com sucesso!');
            return response()->json(['message' => 'Status criado com sucesso', 'status' => $status], 201);
        }catch(\Exception $e){
            \Log::error('Erro ao criar status: ' . $e->getMessage());
            return response()->json(['message' => 'Error ao criar status'], 500);
        }
    }    

    public function editarStatus(Request $request, Status $status)
    {
        try{
            $request->validate([
                'nome' => 'required|string|max:255',
            ]);
            $status->update([
                'nome' => $request->nome,
            ]);
            \Log::info('Status atualizado com sucesso!');
            return response()->json(['message' => 'Status atualizado com sucesso', 'status' => $status], 200);
        }catch(\Exception $e){
            \Log::error('Erro ao editar status: ' . $e->getMessage());
            return response()->json(['message' => 'Error ao editar status'], 500);
        }
    }

    public function deletarStatus(Status $status)
    {
        try{
            $status->delete();
            \Log::info('Status deletado com sucesso!');
            return response()->json(['message' => 'Status deletado com sucesso'], 200);
        }catch(\Exception $e){
            \Log::error('Erro ao deletar status: ' . $e->getMessage());
            return response()->json(['message' => 'Error ao deletar status'], 500);
        }
    }
}
