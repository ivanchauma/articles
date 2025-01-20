<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\UserPreferenceController;
use App\Http\Controllers\JWTAuthController;
use App\Http\Middleware\JwtMiddleware;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::post('/auth/login', [JWTAuthController::class, 'login']);
Route::post('/auth/register', [JWTAuthController::class, 'register']);


// Protected routes (authentication required)
Route::middleware([JWTMiddleware::class])->group(function () {
Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/userarticles', [ArticleController::class, 'getUserArticles']);

Route::get('preferences', [UserPreferenceController::class, 'getPreferences']);  // Get preferences
Route::post('preferences', [UserPreferenceController::class, 'updatePreferences']);  // Update preferences

Route::get('/available-sources', [ArticleController::class, 'getAvailableSources']);
Route::get('/available-categories', [ArticleController::class, 'getAvailableCategories']);
Route::get('/available-authors', [ArticleController::class, 'getAvailableAuthors']);
});

// Route::get('news/search', [ArticleController::class, 'search']);
// Route::get('news/topheadlines', [ArticleController::class, 'TopNewsApiHeadlines']);

//Local search
// Route::get('/articles', [ArticleController::class, 'index']);
// Route::get('/userarticles', [ArticleController::class, 'getUserArticles']);

Route::get('/scrape-news', [ArticleController::class, 'scrapeNewsData']);



