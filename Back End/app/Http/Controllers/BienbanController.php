<?php

namespace App\Http\Controllers;

use App\Models\BienBan;
use Illuminate\Http\Request;

class BienbanController extends Controller
{
    public function index()
    {
        return Bienban::all();
    }

    // Hiển thị thông tin của một bản ghi cụ thể
    public function show($mabienban)
    {
        return BienBan::findOrFail($mabienban);
    }

    // Tạo mới một bản ghi
    public function store(Request $request)
    {
        $bienban = Bienban::create($request->all());
        return response()->json($bienban, 201);
    }

    // Cập nhật thông tin của một bản ghi
    public function update(Request $request, $mabienban)
    {
        $bienban = Bienban::findOrFail($mabienban);
        $bienban->update($request->all());
        return response()->json($bienban, 200);
    }

    // Xóa một bản ghi
    public function delete($mabienban)
    {
        $bienban = Bienban::findOrFail($mabienban);
        $bienban->delete();
        return response()->json(null, 204);
    }
}
