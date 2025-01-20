<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Article extends Model
{
    use HasFactory;
    //
    protected $fillable = [
        'title', 'description', 'content', 'published_at', 'source', 'url', 'image_url', 'author', 'category'
    ];
}
