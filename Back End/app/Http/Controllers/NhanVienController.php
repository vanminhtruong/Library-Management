<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NhanVien;

class NhanVienController extends Controller
{
    public function index()
    {
        // Logic để lấy dữ liệu từ model và trả về response
        $nhanviens = NhanVien::all();
        return response()->json($nhanviens);
    }
}
