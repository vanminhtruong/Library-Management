<?php

namespace App\Http\Controllers;

use App\Models\Taikhoan;
use Illuminate\Http\Request;

class TaikhoanController extends Controller
{
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'user' => 'required|unique:taikhoans,user',
            'password' => 'required',
            'email' => 'required|email|unique:taikhoans,email',
        ]);

        $existingUser = TaiKhoan::where('user', $validatedData['user'])
            ->orWhere('email', $validatedData['email'])
            ->first();

        if ($existingUser) {
            return response()->json(['message' => 'Tên người dùng hoặc địa chỉ email đã được sử dụng'], 400);
        }else{
            $taiKhoan = new TaiKhoan();
            $taiKhoan->user = $validatedData['user'];
            $taiKhoan->password = bcrypt($validatedData['password']); // Đảm bảo mã hóa mật khẩu
            $taiKhoan->email = $validatedData['email'];
            $taiKhoan->save();
            return response()->json(['message' => 'Tài khoản đã được đăng ký thành công'], 201);
        }
    }
}
