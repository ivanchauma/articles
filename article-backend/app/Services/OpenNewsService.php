<?php
namespace App\Services;
use Illuminate\Support\Facades\Http;

class OpenNewsService
{
    protected $apiKey;

    public function __construct()
    {
        $this->apiKey = env('OPENNEWS_API_KEY');
    }

    public function getArticles($query = '', $filters = [])
    {
        $response = Http::get("https://api.opennews.org/v1/articles", [
            'q' => $query,
            'apiKey' => $this->apiKey,
            ...$filters
        ]);

        return $response->json();
    }
}

?>
