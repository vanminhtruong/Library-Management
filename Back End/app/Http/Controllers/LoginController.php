<?php

namespace App\Http\Controllers;

use App\Models\Taikhoan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        // Validate incoming request
        $credentials = $request->only('user',
            'password'
        );

        $user = Taikhoan::where('user', $credentials['user'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            // Đăng nhập không thành công
            return response()->json(['message' => 'Tài khoản hoặc mật khẩu không đúng'], 401);
        }
        // Đăng nhập thành công, tạo token
        $token = JWTAuth::fromUser($user);

        return response()->json(['token' => $token], 200);
    }
}
