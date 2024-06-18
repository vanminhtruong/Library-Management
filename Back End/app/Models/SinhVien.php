<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SinhVien extends Model
{
    protected $table = 'sinhviens';
    protected $primaryKey = 'masv';
    public $timestamps = false;
    protected $keyType = 'string';
    protected $hidden = ['created_at', 'updated_at', 'id'];
    public $incrementing = false;
    protected $fillable = [
        'masv',
        'hoten',
        'gioitinh',
        'lop',
        'ngaysinh',
        'diachi',
        'khoa',
        'manv',
        'image' => 'required|image|mimes:jpeg,jpg,png,bmp,gif,svg',
    ];
    
    protected $guarded = [
        'id',
    ];

    public function nhanviens()
    {
        return $this->belongsTo(NhanVien::class, 'manv', 'manv');
    }

    public function bienbans()
    {
        return $this->hasMany(BienBan::class, 'masv', 'masv');
    }

    public function thethuviens()
    {
        return $this->hasMany(TheThuVien::class, 'masv', 'masv');
    }

    public function phieumuons(){
        return $this->hasMany(PhieuMuon::class, 'masv', 'masv');
    }
}
