import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom'; // Import thư viện React Router
import styles from '../../../assets/styles/bienban.module.scss';

const BienBan = () => {
    const { state } = useLocation(); // Sử dụng useLocation để lấy các giá trị từ URL
    const masv = state ? state.masv : ''; // Kiểm tra state trước khi truy cập vào masv
    const masach = state ? state.masach : '';
    const [bienBanList, setBienBanList] = useState([]);
    const [newBienBan, setNewBienBan] = useState({
        mabienban: '',
        masv: masv,
        masach: masach,
        loivipham: '',
        bienphapxuly: '',
        ngay: ''
    });

    useEffect(() => {
        fetchBienBanList();
    }, []);

    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const fetchBienBanList = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/bienbans');
            setBienBanList(response.data);
        } catch (error) {
            console.error('Error fetching bien ban list:', error);
        }
    };

    const addNewOrUpdateBienBan = async () => {
        try {
            if (isEditing) {
                let edit = await axios.put(`http://127.0.0.1:8000/api/bienbans/${editId}`, newBienBan);
                alert("edit successfully");
                console.log("add: "+JSON.stringify(edit.data))
            } else {
                let add = await axios.post('http://127.0.0.1:8000/api/bienbans', newBienBan);
                alert("add successfully");
                console.log("add: "+JSON.stringify(add.data))
            }
            fetchBienBanList();
            setNewBienBan({
                mabienban: '',
                masv: '',
                masach: '',
                loivipham: '',
                bienphapxuly: '',
                ngay: ''
            });
            setIsEditing(false);
        } catch (error) {
            console.error('Error adding/updating bien ban:', error);
        }
    };

    const deleteBienBan = async (mabienban) => {
        try {
            const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa biên bản này?");
            if(confirmDelete){
                await axios.delete(`http://127.0.0.1:8000/api/bienbans/${mabienban}`);
                alert("remove successfully");
                fetchBienBanList();
            }
        } catch (error) {
            console.error('Error deleting bien ban:', error);
        }
    };

    const inputFields = [
        { label: "Mã Biên bản", name: "mabienban",readOnly: true },
        { label: "Mã SV", name: "masv", valueUrl: masv, disabled: true},
        { label: "Mã Sách", name: "masach", valueUrl: masach, disabled: true},
        { label: "Loại vi phạm", name: "loivipham" },
        { label: "Biện pháp xử lý", name: "bienphapxuly" },
        { label: "Ngày", name: "ngay" ,type: 'date'}
    ];

    const editBienBan = (bienban) => {
        setIsEditing(true);
        setEditId(bienban.mabienban);
        setNewBienBan({
            mabienban: bienban.mabienban,
            masv: bienban.masv,
            masach: bienban.masach,
            loivipham: bienban.loivipham,
            bienphapxuly: bienban.bienphapxuly,
            ngay: bienban.ngay
        });
    };

    const handleInputChange = (e, name) => {
        setNewBienBan({ ...newBienBan, [name]: e.target.value });
    };

    const resetForm = () => {
        setNewBienBan({
            mabienban: '',
            masv: masv,
            masach: masach,
            loivipham: '',
            bienphapxuly: '',
            ngay: ''
        });
        setIsEditing(false);
    };

    return (
        <div className={`${styles.top}`}>
            <h1 className="text-white">Quản lý Biên bản</h1>
            <div className="card shadow bg-transparent">
                <div className="card-body ">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Mã Biên bản</th>
                                <th scope="col">Mã SV</th>
                                <th scope="col">Mã Sách</th>
                                <th scope="col">Loại vi phạm</th>
                                <th scope="col">Biện pháp xử lý</th>
                                <th scope="col">Ngày</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bienBanList.map((bienban) => (
                                <tr key={bienban.mabienban}>
                                    <td>{bienban.mabienban}</td>
                                    <td>{bienban.masv}</td>
                                    <td>{bienban.masach}</td>
                                    <td>{bienban.loivipham}</td>
                                    <td>{bienban.bienphapxuly}</td>
                                    <td>{bienban.ngay}</td>
                                    <td>
                                        <span className={`btn btn-primary btn-sm ${styles.right}`} onClick={() => editBienBan(bienban)}><i class="fa-regular fa-pen-to-square"></i></span>
                                        <span className="btn btn-danger btn-sm" onClick={() => deleteBienBan(bienban.mabienban)}><i class="fa-solid fa-trash"></i></span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={`${styles.width}`}>
                <div className={`card mt-4 shadow ${styles.center}`}>
                    <div>
                        <div className="text-center text-uppercase mt-3">{isEditing ? 'Sửa Biên bản' : 'Thêm Biên bản mới'}</div>
                        <div className={`card-body`}>
                            <form>
                                {inputFields.map((field, index) => (
                                    <div className="form-group" key={index}>
                                        <label>{field.label}</label>
                                        <input
                                            className="form-control"
                                            type={field.type || 'text'}
                                            placeholder={field.label}
                                            value={newBienBan[field.name] || field.valueUrl}
                                            onChange={(e) => handleInputChange(e, field.name)}
                                            disabled={isEditing ? field.readOnly || field.disabled : field.disabled}
                                        />
                                    </div>
                                ))}
                                <button className="btn btn-primary mr-2 mt-3" onClick={addNewOrUpdateBienBan}>{isEditing ? 'Lưu' : 'Thêm'}</button>
                                {isEditing && <button className="btn btn-secondary mt-3" onClick={resetForm}>Hủy</button>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BienBan;