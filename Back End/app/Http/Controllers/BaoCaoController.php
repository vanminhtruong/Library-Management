<?php

namespace App\Http\Controllers;

use App\Models\BienBan;
use App\Models\PhieuMuon;
use Illuminate\Http\Request;

class BaoCaoController extends Controller
{
    public function ShowPhieuMuon()
    {
        $phieuMuons = PhieuMuon::all();
        return response()->json($phieuMuons);
    }

    public function muonQuaHan()
    {
        // Tính thời gian hiện tại
        $currentTime = now();

        // Lấy các bản ghi mượn sách quá hạn (> 6 tháng)
        $phieuMuonsQuaHan = PhieuMuon::whereRaw('DATEDIFF(ngaytra, ngaymuon) > 180')
        ->get();

        return response()->json($phieuMuonsQuaHan);
    }

    public function showbienBan(){
        $bienbans = BienBan::join('sinhviens', 'bienbans.masv', '=', 'sinhviens.masv')
        ->select('bienbans.*', 'sinhviens.hoten as hoten')
        ->get();
        return response()->json($bienbans);
    }
}
