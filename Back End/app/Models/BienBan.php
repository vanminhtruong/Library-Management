<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BienBan extends Model
{
    protected $table = 'bienbans';
    protected $primaryKey = 'mabienban'; // Khai báo khóa chính
    protected $keyType = 'string';
    public $timestamps = false;
    protected $hidden = ['created_at', 'updated_at'];
    protected $fillable = ['mabienban', 'masv', 'masach', 'loivipham', 'bienphapxuly', 'ngay'];

    public function sinhviens()
    {
        return $this->belongsTo(SinhVien::class, 'masv', 'masv');
    }

    public function sachs()
    {
        return $this->belongsTo(Sach::class, 'masach', 'masach');
    }
}
