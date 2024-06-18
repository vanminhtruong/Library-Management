<?php

namespace App\Http\Controllers;

use App\Models\SinhVien;
use App\Models\TheThuVien;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Stmt\Else_;

class TheThuVienController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'mathe' => 'required|unique:thethuviens,mathe|max:255',
            'thoigiancap' => 'required|string',
            'hsd' => 'required|string',
            'masv' => 'required|string|exists:sinhviens,masv',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $thethuvien = new TheThuVien();
        $thethuvien->mathe = $request->input('mathe');
        $thethuvien->thoigiancap = $request->input('thoigiancap');
        $thethuvien->hsd = $request->input('hsd');
        $thethuvien->masv = $request->input('masv');

        $thethuvien->save();

        // Generate JWT token
        $token = JWTAuth::fromUser($thethuvien);

        return response()->json(['message' => 'TheTshuVien created successfully', 'token' => $token], 201);
    }

    public function printMasv()
    {
        $sinhViens = SinhVien::select('masv')->get();

        return response()->json($sinhViens);
    }

    public function kiemTraTrungKhop(Request $request)
    {
        // Lấy dữ liệu từ yêu cầu
        $data = $request->only(['mathe', 'thoigiancap', 'hsd', 'masv']);

        // Kiểm tra sự tồn tại của bản ghi
        $existingRecord = TheThuVien::where('mathe', $data['mathe'])
        ->where('thoigiancap', $data['thoigiancap'])
        ->where('hsd', $data['hsd'])
        ->where('masv', $data['masv'])
        ->first();

        // Nếu bản ghi trùng khớp được tìm thấy
        if ($existingRecord) {
            // Tạo token từ dữ liệu kiểm tra trùng khớp
            $token = JWTAuth::fromUser($existingRecord);
            // Trả về token và dữ liệu kiểm tra trùng khớp
            return response()->json(['token' => $token, 'record' => $existingRecord]);
        }

        // Nếu không tìm thấy bản ghi trùng khớp
        return response()->json(['message' => 'Không tìm thấy bản ghi trùng khớp'], 404);
    }
}
