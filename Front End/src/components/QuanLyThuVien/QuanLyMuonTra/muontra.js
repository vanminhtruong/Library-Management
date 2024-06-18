import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { json, useNavigate } from 'react-router-dom';

const API_URL = 'http://127.0.0.1:8000'; // Thay thế bằng URL của API của bạn

const MuonTra = () => {
    const [phieuMuons, setPhieuMuons] = useState([]);
    const [formData, setFormData] = useState({
        maphieumuon: '',
        ngaymuon: '',
        ngaytra: '',
        soluong: '',
        tinhtrangsach: '',
        masach: '',
        masv: ''
    });
    const [sachs, setSachs] = useState([]);
    const [sinhViens, setSinhViens] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [token, setToken] = useState('');
    const [error,setError] = useState(false);
    const [message, setMessage] = useState(null);
    const [tokenLogin, setTokenLogin] = useState('');
    const navigate = useNavigate();
    let isNotCheck = true;

    // Hàm để lấy token từ local storage khi component được load
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const tokenLoginThuVien = localStorage.getItem('tokenLogin');
        if (storedToken) {
            setToken(storedToken);
            console.log("my token is: "+JSON.stringify(storedToken));
        }else{
            setError(true);
        }

        if(tokenLoginThuVien){
            setTokenLogin(tokenLoginThuVien);
            console.log("me may: "+JSON.stringify(tokenLoginThuVien))
        }else{
            alert("Bạn cần phải đăng nhập thẻ thư viện trước");
            navigate('/checkthe');
        }
    }, []);

    // Hàm để lấy danh sách phiếu mượn từ API khi component được load
    useEffect(() => {
        fetchPhieuMuons();
        fetchSachs();
        fetchSinhViens();
        
    }, []);

    // Hàm để gửi yêu cầu lấy danh sách phiếu mượn từ API
    const fetchPhieuMuons = async () => {
        try { 
            const config = {
                headers: {
                    Authorization: `Bearer ${tokenLogin}`,
                }
            };
            const response = await axios.get(`${API_URL}/phieumuons`,config);
            setPhieuMuons(response.data);
            
        } catch (error) {
            console.error('Error fetching phieu muons:', error);
        }
    };


    // Hàm để gửi yêu cầu lấy danh sách sách từ API
    const fetchSachs = async () => {
        try {
        const response = await axios.get(`${API_URL}/sachs`);
        setSachs(response.data);
        } catch (error) {
        console.error('Error fetching sachs:', error);
        }
    };

    // Hàm để gửi yêu cầu lấy danh sách sinh viên từ API
    const fetchSinhViens = async () => {
        try {
        const response = await axios.get(`${API_URL}/api/sinhviens`);
        setSinhViens(response.data);
        } catch (error) {
        console.error('Error fetching sinh viens:', error);
        }
    };

    // Hàm để tạo mới một phiếu mượn
    const createPhieuMuon = async () => {
        try {
        let add = await axios.post(`${API_URL}/phieumuons`, formData);
        fetchPhieuMuons(); // Lấy lại danh sách phiếu mượn sau khi tạo mới
        alert("add success!");
        } catch (error) {
            if(error.response.status === 409){
                alert("this phieumuon is exit");
            }else{
                console.error('Error creating phieu muon:', error);
            }
        }
    };

    // Hàm để cập nhật một phiếu mượn
    const updatePhieuMuon = async () => {
        try {
            await axios.put(`${API_URL}/phieumuons/${editId}`, formData,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert("edit success!");
            setEditing(false);
            setEditId(null);
            fetchPhieuMuons(); // Lấy lại danh sách phiếu mượn sau khi cập nhật
        
        } catch (error) {
            if(error.response.status === 401){
                setMessage(alert("Bạn không có quyền sửa"));
                setEditing(false);
            }
            console.error('Error updating phieu muon:', error);
        }
    };

    // Hàm để xóa một phiếu mượn
    const deletePhieuMuon = async (maphieumuon) => {
        try {
        await axios.delete(`${API_URL}/phieumuons/${maphieumuon}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        fetchPhieuMuons(); // Lấy lại danh sách phiếu mượn sau khi xóa
        } catch (error) {
            if(error.response.status === 401){
                setMessage(alert("Bạn không có quyền xóa"));
            }
            console.error('Error deleting phieu muon:', error);
        }
    };

    // Hàm xử lý khi form được submit để tạo mới hoặc cập nhật một phiếu mượn
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editing) {
            updatePhieuMuon();
        } else {
            createPhieuMuon();
        }
        // Sau khi tạo mới hoặc cập nhật, reset form
        setFormData({
        maphieumuon: '',
        ngaymuon: '',
        ngaytra: '',
        soluong: '',
        tinhtrangsach: '',
        masach: '',
        masv: ''
        });
    };

    // Hàm xử lý khi click vào nút sửa
    const handleEditClick = (phieuMuon) => {
        try{
            setEditing(true);
            setEditId(phieuMuon.maphieumuon);
            setFormData({
                maphieumuon: phieuMuon.maphieumuon,
                ngaymuon: phieuMuon.ngaymuon,
                ngaytra: phieuMuon.ngaytra,
                soluong: phieuMuon.soluong,
                tinhtrangsach: phieuMuon.tinhtrangsach,
                masach: phieuMuon.masach,
                masv: phieuMuon.masv
            });
        }catch(error){
            if(error.response && error.response.status === 401){
                setError(true);
            }
            console.error("Is Error: "+error);
        }
    };

    // Hàm xử lý thay đổi giá trị của các input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const colors = [
        'table-primary',
        'table-secondary',
        'table-success',
        'table-danger',
        'table-warning',
        'table-info',
        'table-dark'
    ];

    return (
        <div className='container text-white'><br/>
            <h1 className="mb-4 mt-5">Quản lý phiếu mượn</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row">
                {Object.keys(formData).map((key, index) => (
                    <div key={key} className="col-md-3 mb-3">
                    {key === 'masach' || key === 'masv' ? (
                        <div className="form-group">
                        <label htmlFor={key}>{key.toUpperCase()}</label>
                        <select
                            id={key}
                            name={key}
                            value={formData[key]}
                            onChange={handleInputChange}
                            className="form-select"
                            required
                        >
                            <option value="">Chọn {key}</option>
                            {key === 'masach' ? (
                            sachs.map((sach) => (
                                <option key={sach.masach} value={sach.masach}>{sach.masach}</option>
                            ))
                            ) : (
                            sinhViens.map((sinhVien) => (
                                <option key={sinhVien.masv} value={sinhVien.masv}>{sinhVien.masv}</option>
                            ))
                            )}
                        </select>
                        </div>
                    ) : key === 'ngaymuon' || key === 'ngaytra' ? (
                        <div className="form-group">
                        <label htmlFor={key}>{key.toUpperCase()}</label>
                        <input
                            type="date"
                            id={key}
                            name={key}
                            value={formData[key]}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                        </div>
                    ) : (
                        <div className="form-group">
                        <label htmlFor={key}>{key.toUpperCase()}</label>
                        <input
                            type="text"
                            id={key}
                            name={key}
                            value={formData[key]}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder={key}
                            required
                        />
                        </div>
                    )}
                    </div>
                ))}
                <div className="col-md-12">
                    <button type="submit" className="btn btn-primary">{editing ? 'Lưu' : 'Tạo mới phiếu mượn'}</button>
                </div>
                </div>
            </form>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th scope="col" className={colors[0]}>Mã phiếu mượn</th>
                        <th scope="col" className={colors[1]}>Ngày mượn</th>
                        <th scope="col" className={colors[2]}>Ngày trả</th>
                        <th scope="col" className={colors[3]}>Số lượng</th>
                        <th scope="col" className={colors[4]}>Tình Trạng Sách</th>
                        <th scope="col" className={colors[5]}>Mã Sách</th>
                        <th scope="col" className={colors[6]}>Mã Sinh Viên</th>
                        <th scope="col" className={colors[0]}>Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {phieuMuons.map((phieuMuon) => (
                        <tr key={phieuMuon.maphieumuon}>
                        <td>{phieuMuon.maphieumuon}</td>
                        <td>{phieuMuon.ngaymuon}</td>
                        <td>{phieuMuon.ngaytra}</td>
                        <td>{phieuMuon.soluong}</td>
                        <td>{phieuMuon.tinhtrangsach}</td>
                        <td>{phieuMuon.masach}</td>
                        <td>{phieuMuon.masv}</td>
                        <td>
                            <button onClick={() => handleEditClick(phieuMuon)} className="btn btn-sm btn-warning me-2" disabled={error}>Sửa</button>
                            <button onClick={() => deletePhieuMuon(phieuMuon.maphieumuon)} className="btn btn-sm btn-danger" disabled={error}>Xóa</button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MuonTra;