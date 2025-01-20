<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Log;
use App\NewsServiceInterface;

class NewsApiService implements NewsServiceInterface
{
    protected $client;
    protected $apiKey;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = env('NEWS_API_KEY');
    }

    // Fetch articles using the NewsAPI endpoint
    public function getArticles($query = '', $filters = [])
    {
        $url = 'https://newsapi.org/v2/everything';

        // Set up the parameters
        $parameters = [
            'q' => $query,
            'apiKey' => $this->apiKey,
        ];

        // Optional: Add additional filters if provided
        if (!empty($filters['category'])) {
            $parameters['category'] = $filters['category'];
        }

        if (!empty($filters['language'])) {
            $parameters['language'] = $filters['language'];
        }

        if (!empty($filters['sources'])) {
            $parameters['sources'] = $filters['sources'];
        }

        if (!empty($filters['domains'])) {
            $parameters['domains'] = $filters['domains'];
        }

        if (!empty($filters['from'])) {
            $parameters['from'] = $filters['from'];
        }

        if (!empty($filters['to'])) {
            $parameters['to'] = $filters['to'];
        }

        if (!empty($filters['sortBy'])) {
            $parameters['sortBy'] = $filters['sortBy'];
        }

       // Log::info($parameters);
       // Log::info($filters);

        // Make the API request
        try {
            $response = $this->client->request('GET', $url, [
                'query' => $parameters // Send parameters as query params
            ]);

            // Parse and return the response
            $responseBody = json_decode($response->getBody(), true);
            return $responseBody;
        } catch (RequestException $e) {
            // Handle the error
            return [
                'error' => 'Request failed: ' . $e->getMessage(),
            ];
        }
    }

    // Fetch top headlines
    public function getTopHeadlines($filters = [])
    {
        $url = 'https://newsapi.org/v2/top-headlines';

        // Set up the parameters for top headlines
        $parameters = [
            'apiKey' => $this->apiKey,
        ];

        if (!empty($filters['category'])) {
            $parameters['category'] = $filters['category'];
        }

        if (!empty($filters['language'])) {
            $parameters['language'] = $filters['language'];
        }

        if (!empty($filters['sources'])) {
            $parameters['sources'] = $filters['sources'];
        }

        if (!empty($filters['domains'])) {
            $parameters['domains'] = $filters['domains'];
        }

        // Make the API request
        try {
            $response = $this->client->request('GET', $url, [
                'query' => $parameters
                //'query' => $filters
            ]);

            // Parse and return the response
            $responseBody = json_decode($response->getBody(), true);
            return $responseBody;
        } catch (RequestException $e) {
            // Handle the error
            return [
                'error' => 'Request failed: ' . $e->getMessage(),
            ];
        }
    }

    public function getArticlesFromSources(array $sources)
    {
        $url = 'https://newsapi.org/v2/everything';

        $articles = [];

        foreach ($sources as $source) {
            $parameters = [
                'sources' => $source,
                'apiKey' => $this->apiKey,
            ];

            $response = $this->client->request('GET', $url, ['query' => $parameters]);
            $data = json_decode($response->getBody(), true);
            $articles = array_merge($articles, $data['articles']);
        }

        return ['articles' => $articles];
    }

}
?>
