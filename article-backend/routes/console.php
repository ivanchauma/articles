<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use App\Console\Commands\ScrapeNewsData;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();


Schedule::command('scrape:newsdata')->hourly();

//Schedule::command(ScrapeNewsData::class, 'scrape:newsdata')->hourly();
