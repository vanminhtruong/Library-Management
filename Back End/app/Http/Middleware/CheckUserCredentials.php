<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Firebase\JWT\JWT;
use Tymon\JWTAuth\Contracts\Providers\JWT as ProvidersJWT;
use Tymon\JWTAuth\JWT as JWTAuthJWT;

class CheckUserCredentials
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        // Kiểm tra quyền truy cập của người dùng
        try {
            $payload = JWTAuth::parseToken()->getPayload();

            // Kiểm tra phần payload của JWT
            if ($payload->get('sub') !== 'admin' || $payload->get('prv') !== 'd8db8c0cf238b06b74f561ee122d279d62419324') {
                return response()->json(['message' => 'Unauthorized'], 401);
            }
        } catch (Exception $e) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        return $next($request);
    }
}
