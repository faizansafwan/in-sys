<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

/**
 * Class CategoryController
 * Handles API requests related to categories.
 */
class CategoryController extends Controller
{
    /**
     * Fetch all categories.
     *
     * This method returns a JSON response containing a list of all categories in the database.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function categories()
    {
        return response()->json(Category::all());
    }
}
