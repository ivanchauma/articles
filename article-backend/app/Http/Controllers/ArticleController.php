<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\NewsApiService;
use Illuminate\Support\Facades\Artisan;
use App\Models\Article;
use App\Models\UserPreference;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ArticleController extends Controller
{
    //
    protected $newsApiService;

    public function __construct(NewsApiService $newsApiService)
    {
        $this->newsApiService = $newsApiService;
    }

    //Local search
    public function index(Request $request)
    {
        $title = $request->input('title', '');
        $category = $request->input('category', '');
        $date = $request->input('date', '');
        $source = $request->input('source', '');

        Log::info('Request Inputs: ', ['query' => $title, 'category' => $category, 'date' => $date]);

        // Build the query first
        $queryBuilder = Article::query()
            ->when($title, function ($queryBuilder) use ($title) {
                return $queryBuilder->where('title', 'like', "%{$title}%");
            })
            ->when($category, function ($queryBuilder) use ($category) {
                return $queryBuilder->where('category', $category);
            })
            ->when($source, function ($queryBuilder) use ($source) {
                return $queryBuilder->where('source', $source);
            })
            ->when($date, function ($queryBuilder) use ($date) {
                return $queryBuilder->whereDate('published_at', $date);
            })
            ->latest();

        // Log the SQL query and bindings before executing it
        Log::info('SQL Query: ' . $queryBuilder->toSql());
        Log::info('Bindings: ', $queryBuilder->getBindings());

        // Execute the query with pagination
        $articles = $queryBuilder->paginate(10);

        return response()->json($articles);
    }

    public function getUserArticles(Request $request)
    {
        $user = Auth::user();

       /// Log::info($user);

        // Fetch user preferences
        $preferences = UserPreference::where('user_id', $user->id)->first();

        //Log::info($preferences);

        // Start the query for articles
        $query = Article::query();

        // Filter articles based on user preferences
        if ($preferences) {
            if ($preferences->preferred_sources) {
                $query->whereIn('source', $preferences->preferred_sources);
            }
            if ($preferences->preferred_categories) {
                $query->whereIn('category', $preferences->preferred_categories);
            }
            if ($preferences->preferred_authors) {
                $query->whereIn('author', $preferences->preferred_authors);
            }
        }

        // Fetch filtered articles (with pagination if necessary)
        $articles = $query->latest()->paginate(10);

        Log::info('Final Query: ', [$query->toSql(), $query->getBindings()]);

        return response()->json($articles);
    }

    public function getAvailableSources()
    {
        // Fetch distinct sources
        $sources = Article::distinct()->pluck('source');
        return response()->json($sources);
    }

    public function getAvailableCategories()
    {
        // Fetch distinct categories
        $categories = Article::distinct()->pluck('category');
        return response()->json($categories);
    }

    public function getAvailableAuthors()
    {
        // Fetch distinct authors
        $authors = Article::distinct()->pluck('author');
        return response()->json($authors);
    }


    public function search(Request $request)
    {
          // Get user input from the request, with default values if not provided
          $query = $request->input('query', '');
          $filters = [
              'category' => $request->input('category', ''),
              'language' => $request->input('language', 'en'),
              'sources'  => $request->input('sources', ''), // Optional: specify sources if needed
              'domains'  => $request->input('domains', ''), // Optional: specify domains if needed
              'from' => $request->input('from', ''),
              'to' => $request->input('to', ''),
              'sortBy' => $request->input('sortBy', '')
          ];

          // Ensure that a valid query is passed
          if (empty($query) && empty($filters['sources']) && empty($filters['domains'])) {
              return response()->json(['error' => 'Missing required search parameters'], 400);
          }
          // Call the NewsApiService to fetch the articles
          $articles = $this->newsApiService->getArticles($query, $filters);
          return response()->json($articles);
    }

    public function TopNewsApiHeadlines(Request $request)
    {
        $filters = [
           // 'category' => $request->input('category'),
            'country' => $request->input('country'),
            //'sources' => $request->input('sources'),
            //'domains' => $request->input('domains'),
            'language' => $request->input('language', 'en'),
        ];

        $articles = $this->newsApiService->getTopHeadlines($filters);
        return response()->json($articles);
    }

    public function scrapeNewsData()
    {
        // Call the scraping command programmatically
        $exitCode = Artisan::call('scrape:newsdata');

        // According to the documentation,  Optionally, you can pass parameters to the command like this:
        // $exitCode = Artisan::call('scrape:newsdata', ['--someOption' => 'value']);

        // Return a response based on the result
        if ($exitCode === 0) {
            return response()->json(['message' => 'News data scraped successfully!']);
        }

        return response()->json(['message' => 'Failed to scrape news data.'], 500);
    }


}
