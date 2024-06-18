<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;

class TheThuVien extends Model implements JWTSubject
{
    protected $table = 'thethuviens';
    protected $primaryKey = 'mathe'; // Khai báo khóa chính
    public $timestamps = false;
    protected $keyType = 'string';
    protected $fillable = ['mathe', 'thoigiancap', 'hsd', 'masv'];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function sinhvien()
    {
        return $this->belongsTo(SinhVien::class, 'masv', 'masv');
    }

}
