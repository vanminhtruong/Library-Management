<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PhieuMuon extends Model
{
    protected $table = 'phieumuons';
    protected $primaryKey = 'maphieumuon'; // Khai báo khóa chính
    public $timestamps = false;
    protected $keyType = 'string';
    protected $hidden = ['created_at', 'updated_at'];
    protected $fillable = ['maphieumuon', 'ngaymuon', 'ngaytra', 'soluong', 'tinhtrangsach', 'masach', 'masv'];

    public function sinhviens()
    {
        return $this->belongsTo(SinhVien::class, 'masv', 'masv');
    }
}
