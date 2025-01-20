<?php
// app/Services/NewsApiService.php
namespace App\Services;

use GuzzleHttp\Client;

class NewsApiService
{
    protected $client;
    protected $apiKey;
    protected $news_source;


    //TODO
    //You will create Helper to retrieve the datasource link, based on the source selected

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = env('NEWS_API_KEY');
    }

    public function fetchNews($query, $filters = [])
    {
        $parameters = array_merge([
            'q' => $query,
            'apiKey' => $this->apiKey,
        ], $filters);

        return $this->sendRequest('GET', 'https://newsapi.org/v2/everything', $parameters);
    }

    private function sendRequest($method, $url, $parameters)
    {
        try {
            $response = $this->client->request($method, $url, ['query' => $parameters]);
            return json_decode($response->getBody(), true);
        } catch (\Exception $e) {
            // Log error
            return ['error' => 'Request failed: ' . $e->getMessage()];
        }
    }
}



?>
