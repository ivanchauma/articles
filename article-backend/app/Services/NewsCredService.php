<?php
// app/Services/NewsCredService.php
namespace App\Services;

use Illuminate\Support\Facades\Http;

class NewsCredService
{
    protected $apiKey;

    public function __construct()
    {
        $this->apiKey = env('NEWSCRED_API_KEY');
    }

    public function getArticles($query = '', $filters = [])
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey
        ])->get("https://api.newscred.com/v2/articles", [
            'q' => $query,
            'limit' => $filters['limit'] ?? 10,
            'language' => $filters['language'] ?? 'en',
        ]);

        return $response->json();
    }
}
?>
