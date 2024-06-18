<?php

namespace App\Http\Controllers;

use App\Models\PhieuMuon;
use Illuminate\Http\Request;

class PhieuMuonController extends Controller
{
    public function index()
    {
        return PhieuMuon::all();
    }

    // Hiển thị thông tin của một phiếu mượn cụ thể
    public function show($id)
    {
        return PhieuMuon::findOrFail($id);
    }

    // Tạo mới một phiếu mượn
    public function store(Request $request)
    {
        $requestData = $request->all();
        // Kiểm tra xem đã tồn tại phiếu mượn với mã phiếu mượn được cung cấp chưa
        if (PhieuMuon::where('maphieumuon', $requestData['maphieumuon'])->exists()) {
            return response()->json(['message' => 'Mã phiếu mượn đã tồn tại'], 409); // Trả về mã lỗi 409 Conflict
        }
        return PhieuMuon::create($requestData);
    }

    // Cập nhật thông tin của một phiếu mượn
    public function update(Request $request, $id)
    {
        $phieuMuon = PhieuMuon::findOrFail($id);
        $phieuMuon->update($request->all());

        return $phieuMuon;
    }

    // Xóa một phiếu mượn
    public function destroy($id)
    {
        $phieuMuon = PhieuMuon::findOrFail($id);
        $phieuMuon->delete();

        return 204; // No Content
    }
}
