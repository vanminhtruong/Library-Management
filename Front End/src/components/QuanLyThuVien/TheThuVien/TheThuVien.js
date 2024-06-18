import React, { useState ,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../../assets/styles/The.module.scss';
import { useTheThuVien } from '../../../Hooks/useTheThuVien';
import { DangKyThe } from '../../../services/api/DangKiThe';

function TheThuVien() {
    const [formData, setFormData] = useState({
        mathe: '',
        thoigiancap: '',
        hsd: '', 
        masv: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value
        });
    };

    const sinhVienList = useTheThuVien();

    const handleSubmit = (e) => {
        e.preventDefault();
        DangKyThe(formData)
        .then(response => {
            console.log("is: "+JSON.stringify(response.data.token));
            // Thực hiện các hành động khác sau khi đăng ký thành công
            localStorage.setItem('tokenSingIn', response.data.token);
            alert("Đăng Ký thành công");
        })
        .catch(error => {
            console.error('Đăng ký thất bại:', error);
            // Xử lý lỗi
        });
    };


    return (
        <div className={styles.top}>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className={"card bg-transparent text-white"}>
                        <div className="card-body">
                            <h1 className="card-title text-center mb-4">Đăng Ký Thẻ Thư Viện</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Mã thẻ:</label>
                                    <input type="text" className="form-control" name="mathe" placeholder='Mã Thẻ' value={formData.mathe} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Thời gian cấp:</label>
                                    <input type="date" className="form-control" name="thoigiancap" placeholder='Thời Gian Cấp' value={formData.thoigiancap} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Hạn sử dụng:</label>
                                    <input type="date" className="form-control" name="hsd" placeholder='Hạn Sử Dụng' value={formData.hsd} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Mã sinh viên:</label>
                                    <select className="form-select" name="masv" value={formData.masv} onChange={handleChange} required>
                                        <option value="">Chọn mã sinh viên</option>
                                        {sinhVienList.map(sinhVien => (
                                            <option key={sinhVien.masv} value={sinhVien.masv}>{sinhVien.masv}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">Đăng ký</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TheThuVien;
