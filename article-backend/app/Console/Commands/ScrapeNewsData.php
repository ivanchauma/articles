<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\NewsApiService;
use App\Models\Article;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class ScrapeNewsData extends Command
{
    protected $signature = 'scrape:newsdata';
    protected $description = 'Scrape news data from selected sources and store locally';

    protected $newsApiService;

    public function __construct(NewsApiService $newsApiService)
    {
        parent::__construct();
        $this->newsApiService = $newsApiService;
    }

    public function handle()
    {
        // Fetch data from external sources via the NewsApiService
        $sources = ['bbc-news', 'cnn', 'techcrunch']; // example sources
        $articles = $this->newsApiService->getArticlesFromSources($sources);

        Log::info($articles);
        // Loop through the articles and save them to the database
        foreach ($articles['articles'] as $article) {
            $publishedAt = Carbon::parse($article['publishedAt'])->toDateTimeString();  // Converts to 'Y-m-d H:i:s'
                    // Check if author and category exist, and use fallback values if necessary
        $author = $article['author'] ?? 'Unknown Author'; // Fallback to "Unknown Author" if no author is provided
        $category = $article['category'] ?? 'Uncategorized'; // Fallback to "Uncategorized" if no category is provided

            Article::updateOrCreate(
                ['url' => $article['url']],  // Ensure articles are unique by their URL
                [
                    'title' => $article['title'],
                    'description' => $article['description'],
                    'content' => $article['content'],
                    'published_at' => $publishedAt,
                    'source' => $article['source']['name'],
                    'author' => $author,
                    'category' => $category,
                    'url' => $article['url'],
                    'image_url' => $article['urlToImage'],
                ]
            );
        }

        $this->info('News data scraped and stored successfully!');
        Log::info('News data scraped and stored successfully!');
    }
}
