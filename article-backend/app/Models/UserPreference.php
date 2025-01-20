<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserPreference extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'user_id', 'preferred_sources', 'preferred_categories', 'preferred_authors',
    ];

    protected $casts = [
        'preferred_sources' => 'array',  // Cast to array
        'preferred_categories' => 'array',  // Cast to array
        'preferred_authors' => 'array',  // Cast to array
    ];
}
