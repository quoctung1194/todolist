<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'id', 
        'name',
        'project',
        'priority',
        'deadline',
        'status',
        'started_date',
        'completed_date'
    ];
}
