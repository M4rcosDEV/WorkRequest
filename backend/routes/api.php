<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\SolicitacoesController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PrioridadesController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//User
Route::post('/registrar', [UserController::class, 'criarUser']);
Route::post('/login', [LoginController::class, 'login']);


//Rotas protegidas
Route::middleware('auth:sanctum')->group(function () {
    // Rota para obter informações do usuário autenticado
    Route::get('/perfil', [UserController::class, 'perfil']);
    Route::get('/logout', [LogoutController::class, 'logout']);

    //CRUD status
    Route::get('/status', [StatusController::class , 'index'])->name('status.index');
    Route::post('/status', [StatusController::class , 'criarStatus'])->name('status.criar');
    Route::put('/status/{status}', [StatusController::class , 'editarStatus'])->name('status.editar');
    Route::delete('/status/{status}', [StatusController::class , 'deletarStatus'])->name('status.deletar');

    //CRUD prioridades
    Route::get('/prioridades', [PrioridadesController::class , 'index']);
    Route::post('/prioridades', [PrioridadesController::class , 'criarPrioridade']);
    Route::put('/prioridades/{prioridade}', [PrioridadesController::class , 'editarPrioridade']);
    Route::delete('/prioridades/{prioridade}', [PrioridadesController::class , 'deletarPrioridade']);

    //CRUD solicitacoes
    Route::get('/solicitacoes', [SolicitacoesController::class , 'index']);
    Route::post('/solicitacoes', [SolicitacoesController::class , 'criarSolicitacao']);
    Route::put('/solicitacoes/{solicitacao}', [SolicitacoesController::class , 'editarSolicitacao']);
    Route::delete('/solicitacoes/{solicitacao}', [SolicitacoesController::class , 'deletarSolicitacao']);
});   


