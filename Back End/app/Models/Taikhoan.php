<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;


class Taikhoan extends Model implements JWTSubject
{
    use HasFactory;
    protected $table = 'taikhoans'; // Đặt tên bảng
    protected $primaryKey = 'user'; // Đặt tên trường khóa chính
    protected $keyType = 'string';
    // Các trường có thể gán giá trị
    protected $fillable = [
        'user', 'password', 'email',
    ];
    public $timestamps = false;

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
