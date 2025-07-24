<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;


/**
 * Class ProductController
 *
 * Handles CRUD operations for products including listing with filters,
 * creation, update, and deletion.
 */

class ProductController extends Controller
{
    /**
     * Fetch products with optional filters: name, category, and status.
     * Results are paginated and include related category data.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function fetchProduct(Request $request)
    {
        $query = Product::with('category');

        // Filter by product name
        if ($request->has('name') && !empty($request->name)) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

         // Filter by category name
        if ($request->has('category') && !empty($request->category)) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('name', $request->category);
            });
        }

        // Filter by product status
        if ($request->has('status') && !empty($request->status)) {
            $query->where('status', $request->status);
        }

        // Paginate the results (10 per page)
        $products = $query->orderBy('created_at', 'desc')->paginate(10);

        return response()->json($products);
    }


    /**
     * Store a new product in the database after validating the request.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function postProduct(Request $request) {

        // check data validation
        $validateProduct = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'status' => 'required|in:active,inactive',
        ]);

        $products = Product::create($validateProduct);

        return response()->json([
            'message' => 'product created successfully.',
            'product' => $products->load('category')
        ], 201);
    }


     /**
     * Update an existing product using its ID after validating the request.
     *
     * @param  Request  $request
     * @param  int      $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateProduct(Request $request, $id) {
    
        $product = Product::findOrFail($id);

        // check data validation
        $validateProduct = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'status' => 'required|in:active,inactive',
        ]);

        $product->update($validateProduct);
        return response()->json([
            'message' => 'Product updated successfully.',
            'product' => $product->load('category')
        ]);
    }

    /**
     * Delete a product using its ID.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteProduct($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully.'
        ]);
    }
}
