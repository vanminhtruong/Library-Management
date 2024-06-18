<?php

namespace App\Http\Controllers;

use App\Models\Sach;
use Illuminate\Http\Request;

class SachController extends Controller
{
    public function index()
    {
        return Sach::all();
    }

    public function store(Request $request)
    {
        return Sach::create($request->all());
    }

    public function show($masach)
    {
        return Sach::find($masach);
    }

    public function update(Request $request, $masach)
    {
        $sach = Sach::findOrFail($masach);
        $sach->update($request->all());
        return $sach;
    }

    public function destroy($masach)
    {
        $sach = Sach::findOrFail($masach);
        $sach->delete();
        return 204;
    }
}
