<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Prioridades extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'relevancia'
    ];

    public function solicitacoes()
    {
        return $this->hasMany(Solicitacoes::class, 'prioridade_id');
    }

}
