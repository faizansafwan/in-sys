<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;

class ProductController extends Controller
{
    //
    public function fetchProduct(Request $request)
    {
        $query = Product::with('category');

        if ($request->has('name') && !empty($request->name)) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        if ($request->has('category') && !empty($request->category)) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('name', $request->category);
            });
        }

        if ($request->has('status') && !empty($request->status)) {
            $query->where('status', $request->status);
        }

        $products = $query->orderBy('created_at', 'desc')->paginate(10);

        return response()->json($products);
    }

    public function postProduct(Request $request) {
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

    public function updateProduct(Request $request, $id) {
    
        $product = Product::findOrFail($id);

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

    public function deleteProduct($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully.'
        ]);
    }
}
