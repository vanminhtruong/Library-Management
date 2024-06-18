import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../../assets/styles/sach.module.scss';
import { fetchSachs } from '../../../services/api/fetchSachs';

const API_URL = process.env.REACT_APP_API_URL_BOOKS;

const Sach = () => {
    const [sachs, setSachs] = useState([]);
    const [newSach, setNewSach] = useState({
        masach: '',
        tensach: '',
        sotrang: '',
        gia: '',
        namxb: '',
        tinhtrangsach: '',
        tentg: '',
        tennxb: '',
        soluong: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedSachId, setSelectedSachId] = useState(null);

    useEffect(() => {
        fetchSachs(setSachs);
    }, []);

    const addOrUpdateSach = async () => {
        try {
            if (isEditing) {
                await axios.put(`${API_URL}/sachs/${selectedSachId}`, newSach);
                alert("Edit books successfully");
            } else {
                await axios.post(`${API_URL}/sachs`, newSach);
                alert("Add books successfully");
            }
            fetchSachs(setSachs); // Fetch updated list after add/update
            setIsEditing(false);
            setSelectedSachId(null);
            setNewSach({
                masach: '',
                tensach: '',
                sotrang: '',
                gia: '',
                namxb: '',
                tinhtrangsach: '',
                tentg: '',
                tennxb: '',
                soluong: ''
            });
        } catch (error) {
            console.error('Error adding/updating sach:', error);
        }
    };

    const deleteSach = async (masach) => {
        const confirmLogout = window.confirm('Bạn có chắc chắn muốn xóa');
        if (confirmLogout) {
            try {
                const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa sách này?');
                if (confirmDelete) {
                    await axios.delete(`${API_URL}/sachs/${masach}`);
                    fetchSachs(setSachs); // Fetch updated list after delete
                }
            } catch (error) {
                console.error('Error deleting sach:', error);
            }
        }
    };

    const handleInputChange = (e, field) => {
        setNewSach({ ...newSach, [field]: e.target.value });
    };

    const editSach = (sach) => {
        setNewSach({ ...sach });
        setIsEditing(true);
        setSelectedSachId(sach.masach);
    };

    return (
        <div className="container text-white"><br />
            <h1 className="mb-4 mt-5">Danh Sách Sách</h1>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th className="bg-primary text-white">Mã sách</th>
                            <th className="bg-secondary text-white col-2">Tên sách</th>
                            <th className="bg-success text-white">Số trang</th>
                            <th className="bg-danger text-white">Giá</th>
                            <th className="bg-warning text-white">Năm xuất bản</th>
                            <th className="bg-info text-white">Tình trạng sách</th>
                            <th className="bg-dark text-white col-1">Tác giả</th>
                            <th className="bg-primary text-white">Nhà xuất bản</th>
                            <th className="bg-secondary text-white">Số lượng</th>
                            <th className="bg-success text-white">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sachs.map((sach) => (
                            <tr key={sach.masach}>
                                <td>{sach.masach}</td>
                                <td>{sach.tensach}</td>
                                <td>{sach.sotrang}</td>
                                <td>{sach.gia}</td>
                                <td>{sach.namxb}</td>
                                <td>{sach.tinhtrangsach}</td>
                                <td>{sach.tentg}</td>
                                <td>{sach.tennxb}</td>
                                <td>{sach.soluong}</td>
                                <td>
                                    <span className={styles.right} onClick={() => editSach(sach)}><i className="fa-regular fa-pen-to-square"></i></span>
                                    <span className={styles.right} onClick={() => deleteSach(sach.masach)}><i className="fa-solid fa-trash"></i></span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <h2 className="mt-4">{isEditing ? 'Sửa sách' : 'Thêm sách mới'}</h2>
            <div className="row">
                {Object.keys(newSach).map((field) => (
                    <div key={field} className="col-md-3 mb-3">
                        <label htmlFor={field} className="font-weight-bold text-uppercase">{field}</label>
                        <input
                            type={field === 'sotrang' || field === 'namxb' || field === 'soluong' ? 'number' : 'text'}
                            className="form-control"
                            placeholder={field}
                            value={newSach[field]}
                            onChange={(e) => handleInputChange(e, field)}
                            readOnly={field === 'masach' && isEditing}
                            disabled={field === 'masach' && isEditing}
                        />
                    </div>
                ))}
            </div>
            <button className="btn btn-success mb-5" onClick={addOrUpdateSach}>{isEditing ? 'Lưu' : 'Thêm sách'}</button>
        </div>
    );
}

export default Sach;
