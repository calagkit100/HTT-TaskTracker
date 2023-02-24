<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
// use Illuminate\Http\Response;
use Inertia\Inertia;
use Inertia\Response;



class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index(): Response
    public function index(): Response
    {
        //
        // return response('Hello, World!');
        return Inertia::render('Todos/Index', [
            //
            'todos' => Todo::with('user:id,name')->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        // dd($request);
        //
        $validated = $request->validate([
            'message' => 'required|string|max:255',
        ]);

        $request->user()->todos()->create($validated);

        return redirect(route('todos.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Todo $todo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo): RedirectResponse
    {
        //Die and Dump this is to test the request from Frontend
        // dd($todo);
        //
        $this->authorize('update', $todo);

        $validated = $request->validate([
            'message' => 'required|string|max:255',
        ]);

        $todo->update($validated);

        return redirect(route('todos.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo): RedirectResponse

    {
        // dd($todo);
        //
        $this->authorize('delete', $todo);

        $todo->delete();

        return redirect(route('todos.index'));
    }
}
