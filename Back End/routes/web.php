<?php

use App\Http\Controllers\BaoCaoController;
use App\Http\Controllers\BienbanController;
use App\Http\Controllers\DocGiaController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\NhanVienController;
use App\Http\Controllers\PhieuMuonController;
use App\Http\Controllers\SachController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TaikhoanController;
use App\Http\Controllers\TheThuVienController;
use Barryvdh\Debugbar\Facades\Debugbar;
use GuzzleHttp\Psr7\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;


Route::get('/', function () {
    return response("hello world");
});

//api handle login
Route::post('/singup', [TaikhoanController::class, 'register']);
Route::post('/loginthuvien',[LoginController::class, 'login']);

// api crud sach
Route::get('/sachs', [SachController::class, 'index']);
Route::post('/sachs', [SachController::class, 'store']);
Route::get('/sachs/{masach}', [SachController::class, 'show']);
Route::put('/sachs/{masach}', [SachController::class, 'update']);
Route::delete('/sachs/{masach}', [SachController::class, 'destroy']);


//api SinhVien
Route::prefix('/api/sinhviens')->group(function () {
    Route::get('/', [StudentController::class, 'index']);
    Route::post('/', [StudentController::class, 'store']);
    Route::get('/{id}', [StudentController::class, 'show']);
    Route::post('/{masv}/edit', [StudentController::class, 'update']);
    Route::delete('/{id}', [StudentController::class, 'destroy']);
});

Route::get('api/nhanviens', [NhanVienController::class, 'index']);
Route::get('/images/{filename}', function ($filename) {
    $path = storage_path('app/public/images/' . $filename);
    // Kiểm tra xem tệp tin có tồn tại không
    if (!Storage::disk('public')->exists('images/' . $filename)) {
        abort(404);
    }

    return response()->file($path);
});


//api muon tra
    // Các router bạn muốn bảo vệ ở đây
Route::get('/phieumuons', [PhieuMuonController::class, 'index']);
Route::post('/checkthe', [TheThuVienController::class, 'kiemTraTrungKhop']);
Route::get('/phieumuons/{id}', [PhieuMuonController::class, 'show']);
Route::post('/phieumuons', [PhieuMuonController::class, 'store']);
Route::group(['middleware' => 'check.credentials'], function () {
    Route::put('/phieumuons/{id}', [PhieuMuonController::class, 'update']);
    Route::delete('/phieumuons/{id}', [PhieuMuonController::class, 'destroy']);
});


Route::get('/information', [DocGiaController::class, 'getInformation']);
Route::get('/api/search/masv/{masv}', [DocGiaController::class, 'searchByMasv']);
Route::get('/api/search/hoten/{hoten}', [DocGiaController::class, 'searchByHoten']);

// Route cho CRUD của Bienban
Route::group(['prefix' => 'api'], function () { 
    Route::get('/bienbans', [BienbanController::class, 'index']);
    Route::get('/bienbans/{mabienban}', [BienbanController::class, 'show']);
    Route::post('/bienbans', [BienbanController::class, 'store']);
    Route::put('/bienbans/{mabienban}', [BienbanController::class, 'update']);
    Route::delete('/bienbans/{mabienban}', [BienbanController::class, 'delete']);
});

// api baocao
Route::prefix('api/baocao')->group(function () {
    Route::get('/phieumuons', [BaoCaoController::class, 'ShowPhieuMuon']);
    Route::get('/phieumuons/quahan', [BaoCaoController::class, 'muonQuaHan']);
    Route::get('/bienbans', [BaoCaoController::class, 'showbienBan']);
});


// Route::group(['middleware' => 'jwt.auth'], function () {
    // Route để thêm một bản ghi mới vào bảng TheThuVien
Route::post('/thethuviens', [TheThuVienController::class, 'store']);
Route::get('/loadDuLieu', [TheThuVienController::class, 'printMasv']);
// });

