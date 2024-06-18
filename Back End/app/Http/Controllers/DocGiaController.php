<?php

namespace App\Http\Controllers;

use App\Models\PhieuMuon;
use App\Models\Sach;
use App\Models\SinhVien;
use Illuminate\Http\Request;

class DocGiaController extends Controller
{
    public function getInformation()
    {
        // Truy vấn dữ liệu sinh viên với thông tin sách mượn
        $data = PhieuMuon::join('sinhviens', 'phieumuons.masv', '=', 'sinhviens.masv')
        ->join('sachs', 'phieumuons.masach', '=', 'sachs.masach')
        ->select(
            'phieumuons.masv',
            'phieumuons.masach',
            'sachs.tensach',
            'phieumuons.tinhtrangsach',
            'sinhviens.hoten',
            'sinhviens.gioitinh',
            'phieumuons.ngaymuon',
            'phieumuons.ngaytra'
        )
        ->get();

        return response()->json($data);
    }

    public function searchByMasv($masv)
    {
        $data = PhieuMuon::join('sinhviens', 'phieumuons.masv', '=', 'sinhviens.masv')
            ->join('sachs', 'phieumuons.masach', '=', 'sachs.masach')
            ->select(
                'phieumuons.masv',
                'phieumuons.masach',
                'sachs.tensach',
                'phieumuons.tinhtrangsach',
                'sinhviens.hoten',
                'sinhviens.gioitinh',
                'phieumuons.ngaymuon',
                'phieumuons.ngaytra'
            )
            ->whereRaw('CAST(phieumuons.masv AS CHAR) LIKE ?', ["%$masv%"])
            ->get();
        return response()->json($data);
    }

    public function searchByHoten($hoten)
    {
        $data = PhieuMuon::join('sinhviens', 'phieumuons.masv', '=', 'sinhviens.masv')
        ->join('sachs', 'phieumuons.masach', '=', 'sachs.masach')
        ->select(
            'phieumuons.masv',
            'phieumuons.masach',
            'sachs.tensach',
            'phieumuons.tinhtrangsach',
            'sinhviens.hoten',
            'sinhviens.gioitinh',
            'phieumuons.ngaymuon',
            'phieumuons.ngaytra'
        )
        ->where('sachs.tensach', 'like', "%$hoten%")
        ->get();

        return response()->json($data);
    }
}
