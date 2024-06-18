<?php

namespace App\Http\Controllers;

use App\Models\SinhVien;
use Barryvdh\Debugbar\Facades\Debugbar;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StudentController extends Controller
{
    public function index()
    {   
        $sinhviens = SinhVien::all();
        return response()->json($sinhviens);
    }

    public function store(Request $request)
    {
        try{
            $request->validate([
                'masv' => 'required|unique:sinhviens',
                'hoten' => 'required',
                'gioitinh' => 'required',
                'lop' => 'required',
                'ngaysinh' => 'required|date',
                'khoa' => 'required',
                'manv' => 'required',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);


            $sinhvien = new SinhVien();
            $sinhvien->fill($request->all());

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = $image->getClientOriginalName();
                $path = $image->storeAs('images', $imageName, 'public');
                $sinhvien->image = $path;
            }

            $sinhvien->save();
            return response()->json(['message' => 'Sinh viên đã được tạo thành công', 'is: ' => $sinhvien], 201);
            Debugbar::info($request->all());
        }catch(Exception $e){
            return response()->json(['error'=>'Lỗi Thêm Sinh Viên'],401);
        }
    }

    public function show($id)
    {
        $sinhvien = SinhVien::findOrFail($id);
        return response()->json($sinhvien);
    }

    public function update(Request $request, $masv)
    {
        $request->validate([
            'hoten' => 'required',
            'gioitinh' => 'required',
            'lop' => 'required',
            'ngaysinh' => 'required|date',
            'khoa' => 'required',
            'manv' => 'required',
            // 'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $sinhvien = SinhVien::where('masv', $masv)->firstOrFail();

        $sinhvien->fill($request->except('image')); // Loại bỏ trường 'image' từ dữ liệu request

        if ($request->hasFile('image')) {
            // Xóa ảnh cũ
            if ($sinhvien->image) {
                Storage::disk('public')->delete($sinhvien->image);
            }
            // Lưu ảnh mới
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $path = $image->storeAs('images', $imageName, 'public');
            $sinhvien->image = $path;
        }

        $sinhvien->save();

        return response()->json(['message' => 'Sinh viên đã được cập nhật thành công']);
    }

    public function destroy($id)
    {
        $sinhvien = SinhVien::findOrFail($id);
        // Xóa ảnh liên kết với sinh viên
        if ($sinhvien->image) {
            Storage::disk('public')->delete($sinhvien->image);
        }
        $sinhvien->delete();
        return response()->json(['message' => 'Sinh viên đã được xóa thành công']);
    }
}
