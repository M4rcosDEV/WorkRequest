<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Solicitacoes extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo',
        'descricao',
        'user_id',
        'status_id',
        'prioridade_id'
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
    public function status()
    {
        return $this->belongsTo(Status::class, 'status_id');
    }

    public function prioridade()
    {
        return $this->belongsTo(Prioridades::class, 'prioridade_id');
    }

}
