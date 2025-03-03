<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Solicitacoes;

class SolicitacoesController extends Controller
{
    public function index()
    {

        try{
            $solicitacoes = Solicitacoes::with([
                'user:id,name,email',
                'status:id,nome',
                'prioridade:id,relevancia'
            ])->get(['id', 'titulo', 'descricao', 'user_id', 'status_id', 'prioridade_id', 'created_at']);

            return response()->json(['message'=>'Consulta realizada com sucesso', 'solicitacoes'=>$solicitacoes],200);
        }catch(\Exception $e){
            return response()->json(['message'=>'Erro ao realizar a consulta', 'error'=>$e->getMessage()],500);
        }
    }

    public function criarSolicitacao(Request $request)
    {
        try{

            $solicitacao = Solicitacoes::create([
                'titulo' => $request->titulo,
                'descricao' => $request->descricao,
                'user_id' => $request->user_id,
                'status_id' => $request->status_id,
                'prioridade_id' => $request->prioridade_id,
            ]);

            \Log::info('Solicitacao criado com sucesso!', ['solicitacao' => $solicitacao]);
            return response()->json([
                'message' => 'Solicitacao criado com sucesso!',
                'solicitacao' => $solicitacao,
            ], 201);

        }catch(\Exception $e){
            \Log::error('Erro ao criar Solicitacao: ' . $e->getMessage());
            return response()->json(['message' => 'Error ao criar Solicitacao'], 500);
        }
    }    

    public function editarSolicitacao(Request $request, Solicitacoes $solicitacao)
    {
        try{
            // Validação dos dados de entrada
            // $request->validate([
            //     'titulo' => 'sometimes|string|max:255', // "sometimes" permite que o campo seja opcional
            //     'descricao' => 'sometimes|string',
            //     'user_id' => 'sometimes|exists:users,id',
            //     'status_id' => 'sometimes|exists:status,id',
            //     'prioridade_id' => 'sometimes|exists:prioridades,id',
            // ]);
            \Log::info('Resquest: ' . $request);
            $solicitacao->update($request->only([
                'titulo',
                'descricao',
                'user_id',
                'status_id',
                'prioridade_id',
            ]));

            \Log::info('Solicitação atualizada com sucesso!', ['solicitacao' => $solicitacao]);
            return response()->json([
                'message' => 'Solicitação atualizada com sucesso',
                'solicitacao' => $solicitacao,
            ], 200);

        }catch(\Exception $e){
            \Log::error('Erro ao editar solicitação: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json([
                'message' => 'Erro ao editar solicitação',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function deletarSolicitacao(Solicitacoes $solicitacao)
    {
        try{
            $solicitacao->delete();
            \Log::info('Solicitacao deletada com sucesso!');
            return response()->json(['message' => 'Solicitacao deletada com sucesso'], 200);
        }catch(\Exception $e){
            \Log::error('Erro ao deletar Solicitacao: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erro ao deletar Solicitacao',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
            
}
