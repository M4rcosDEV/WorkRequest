<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Prioridades;

class PrioridadesController extends Controller
{
    public function index()
    {
        try {
            $prioridades = Prioridades::all();
            \Log::info('Prioridades:', $prioridades->toArray());
            return response()->json(['message' => 'Consulta realizada', 'prioridades' => $prioridades], 200);
        } catch (\Exception $e) {
            \Log::error('Error:', ['message' => $e->getMessage()]);
            return response()->json(['message' => 'Erro ao realizar consulta'], 500);
        }
    }

    public function criarPrioridade(Request $request)
    {
        try {
            $request->validate([
                'nome' => 'required|string|max:30',
            ]);

            $prioridade = Prioridades::create([
                'nome' => $request->nome, 
                'relevancia' => $request->relevancia, 
            ]);

            \Log::info('Prioridade criada com sucesso!');
            return response()->json(['message' => 'Prioridade criada com sucesso', 'prioridade' => $prioridade], 201);
        } catch (\Exception $e) {
            \Log::error('Erro ao criar prioridade: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao criar prioridade'], 500);
        }
    }

    public function editarPrioridade(Request $request, Prioridades $prioridade)
    {
        try {
            $request->validate([
                'nome' => 'required|string|max:30'
            ]);

            $prioridade->update([
                'nome' => $request->nome, 
            ]);

            \Log::info('Prioridade atualizada com sucesso!');
            return response()->json(['message' => 'Prioridade atualizada com sucesso', 'prioridade' => $prioridade], 200);
        } catch (\Exception $e) {
            \Log::error('Erro ao editar prioridade: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao editar prioridade'], 500);
        }
    }

    public function deletarPrioridade(Prioridades $prioridade)
    {
        try {
            $prioridade->delete(); // Deleta a prioridade
            \Log::info('Prioridade deletada com sucesso!');
            return response()->json(['message' => 'Prioridade deletada com sucesso'], 200);
        } catch (\Exception $e) {
            \Log::error('Erro ao deletar prioridade: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao deletar prioridade'], 500);
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