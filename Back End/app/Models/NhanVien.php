<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NhanVien extends Model
{
    protected $table = 'nhanviens';
    public $timestamps = false;
    protected $hidden = ['created_at', 'updated_at'];

    public function sinhviens()
    {
        return $this->hasMany(SinhVien::class, 'manv', 'manv');
    }
}
