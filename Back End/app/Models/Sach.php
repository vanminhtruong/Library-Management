<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sach extends Model
{
    protected $table = 'sachs';
    protected $primaryKey = 'masach'; // Khai báo khóa chính
    protected $keyType = 'string';
    public $timestamps = false;
    protected $hidden = ['created_at', 'updated_at'];
    protected $fillable = [
        'masach',
        'tensach',
        'sotrang',
        'gia',
        'namxb',
        'tinhtrangsach',
        'tentg',
        'tennxb',
        'soluong',
    ];

    public function phieumuons()
    {
        return $this->hasMany(PhieuMuon::class, 'masach', 'masach');
    }

    public function bienbans()
    {
        return $this->hasMany(BienBan::class, 'masach', 'masach');
    }
}
