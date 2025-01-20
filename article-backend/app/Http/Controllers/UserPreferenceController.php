<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\UserPreference;
use Illuminate\Support\Facades\Log;

class UserPreferenceController extends Controller
{
    //
     // Get current user preferences
     public function getPreferences()
     {
         $user = Auth::user();
         $preferences = UserPreference::where('user_id', $user->id)->first();

         return response()->json($preferences);
     }

     // Update user preferences
     public function updatePreferences(Request $request)
     {
        $request->validate([
            'preferred_sources' => 'array',
            'preferred_categories' => 'array',
            'preferred_authors' => 'array',
        ]);

        Log::info($request->all());  // or dd($request->all());


         $user = Auth::user();

         $preferences = UserPreference::updateOrCreate(
             ['user_id' => $user->id],  // Ensure only one record per user
             [
                 'preferred_sources' => $request->preferred_sources,
                 'preferred_categories' => $request->preferred_categories,
                 'preferred_authors' => $request->preferred_authors,
             ]
         );

         return response()->json($preferences);
     }
}
