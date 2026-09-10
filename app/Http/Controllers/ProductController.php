<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Number;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display listing of the products.
     */
    public function index()
    {
        $products = Product::orderBy('title', 'ASC')->get()->map(
            function (Product $product) {
                return [
                    'id' => $product->id,
                    'title' => $product->title,
                    'price' => $product->price,
                    'formattedPrice' => Number::currency($product->price, in: 'IDR', locale: 'id'),
                    'description' => $product->description,
                ];
            }
        );

        return Inertia::render('product/list', [
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new product
     */
    public function create()
    {
        return Inertia::render('product/create');
    }

    /**
     * Store a newly created product in storage.
     */
    public function store(Request $request)
    {
         $validated = $request->validate([
            'title' => ['required', 'string'],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric', 'integer'],
        ]);

        $name = $validated['title'];
        $newProduct = Product::create([
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
        ]);

        $short_name = createShortName($request->title);

        Inertia::flash([
            'toast' => [
                'type' => 'success',
                'message' => 'Product: "'.$short_name.'" has been created successfully.',
            ],
        ]);

        return redirect()->route('products.index');
    }

    /**
     * Show a page containing details of a product.
     */
    public function show(Product $product)
    {
        return Inertia::render('product/show', [
            'product' => $product,
        ]);
    }

    /**
     * Show the form for editing the specified product.
     */
    public function edit(Product $product)
    {
        return Inertia::render('product/edit', [
            'product' => $product,
        ]);
    }

    /**
     * Update the specified product in storage.
     */
    public function update(Request $request, Product $product)
    {

        $validated = $request->validate([
            'title' => ['required', 'string'],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric', 'integer'],
        ]);



        $product->update([
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
        ]);

        $short_name = createShortName($request->title);

        Inertia::flash([
            'toast' => [
                'type' => 'success',
                'message' => 'Product: "'.$short_name.'" has been updated successfully.',
            ],
        ]);

        return redirect()->route('products.index');
    }

    /**
     * Remove the specified product from storage
     */
    public function destroy(Product $product)
    {
        $product->delete();

        $short_name = createShortName($product->title);

        Inertia::flash([
            'toast' => [
                'type' => 'success',
                'message' => 'Product: "'.$short_name.'" has been deleted successfully.',
            ],
        ]);
    }
}

function createShortName(string $name)
{
    $length = strlen($name);
    $short_name = $name;

    if ($length > 25) {
        $short_name = substr($name, 0, 22).'...';
    }

    return $short_name;
}
