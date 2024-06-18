import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import styles from '../../../assets/styles/sinhvien.module.scss';
import { fetchSinhviens } from '../../../services/api/fetchSinhviens';
import { fetchManvOptions } from '../../../services/api/fetchManvOptions';

const Sinhvien = () => {
    const [sinhviens, setSinhviens] = useState([]);
    const [manvOptions, setManvOptions] = useState([]);
    const [formData, setFormData] = useState({
        masv: '',
        hoten: '',
        gioitinh: '',
        lop: '',
        ngaysinh: '',
        diachi: '',
        khoa: '',
        manv: '',
        image: null
    });
    const [editingID, setEditingID] = useState(null);
    const [errors, setErrors] = useState({});
    const [imageURL, setImageURL] = useState(null);

    const API_URL_SINHVIENS = process.env.REACT_APP_API_URL_SINHVIENS;

    useEffect(() => {
        fetchSinhviens(setSinhviens);
        fetchManvOptions(setManvOptions);
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onDrop = (acceptedFiles) => {
        setFormData({ ...formData, image: acceptedFiles[0] });
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const formDataWithImage = new FormData();
        for (const key in formData) {
            if (key === 'image' && formData.image instanceof File) {
            formDataWithImage.append(key, formData.image);
            } else {
            formDataWithImage.append(key, formData[key]);
            }
        }

        if (editingID) {
            let edit = await axios.post(`${API_URL_SINHVIENS}/${editingID}/edit`, formDataWithImage, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("is: " + JSON.stringify(edit.data));
            alert("Edit Successfully");
            setEditingID(null);
        } else {
            let add = await axios.post(API_URL_SINHVIENS, formDataWithImage, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert("Add Successfully");
            console.log("is: " + JSON.stringify(add.data));
        }
            setFormData({
                masv: '',
                hoten: '',
                gioitinh: '',
                lop: '',
                ngaysinh: '',
                diachi: '',
                khoa: '',
                manv: '',
                image: null
            });
            
            setErrors({});
            fetchSinhviens(setSinhviens);
        } catch (error) {
        if (error.response && error.response.data.errors) {
            setErrors(error.response.data.errors);
        }
        console.error('Error creating/updating sinhvien:', error);
        }
    };

    const handleEdit = (sinhvien) => {
        setFormData(sinhvien);
        setEditingID(sinhvien.masv);
        setImageURL(sinhvien.image);
    };

    const handleDelete = async (masv) => {
        const confim = window.confirm("Bạn có muốn xóa sinh viên này không");
        if(confim){
            try {
                await axios.delete(`${API_URL_SINHVIENS}/${masv}`);
                fetchSinhviens(setSinhviens);
            } catch (error) {
                console.error('Error deleting sinhvien:', error);
            }
        }
    };

    return (
        <div className="container"><br/>
            <h1 className="text-center mb-4 mt-5 text-white">Quản Lý Sinh Viên</h1>
            <div className="row justify-content-center">
                <div className="col-md-6">
                <form onSubmit={handleSubmit} className="card shadow-sm bg-transparent text-white">
                    <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="masv">Mã Sinh Viên</label>
                        <input type="text" placeholder='Mã Sinh Viên' className="form-control mt-3 mb-3" id="masv" name="masv" value={formData.masv} onChange={handleInputChange} />
                        {errors.masv && <div className="invalid-feedback d-block">{errors.masv[0]}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="hoten">Họ tên</label>
                        <input type="text" placeholder='Họ Tên' className="form-control mt-3 mb-3" id="hoten" name="hoten" value={formData.hoten} onChange={handleInputChange} />
                        {errors.hoten && <div className="invalid-feedback d-block">{errors.hoten[0]}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="gioitinh">Giới tính</label>
                        <select className="form-select custom-select mt-3 mb-3" id="gioitinh" name="gioitinh" value={formData.gioitinh} onChange={handleInputChange}>
                            <option value="">Chọn giới tính</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {errors.gioitinh && <div className="invalid-feedback d-block">{errors.gioitinh[0]}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="lop">Lớp</label>
                        <input type="text" placeholder='Lớp' className="form-control mt-3 mb-3" id="lop" name="lop" value={formData.lop} onChange={handleInputChange} />
                        {errors.lop && <div className="invalid-feedback d-block">{errors.lop[0]}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="ngaysinh">Ngày sinh</label>
                        <input type="date" className="form-control mt-3 mb-3" id="ngaysinh" name="ngaysinh" value={formData.ngaysinh} onChange={handleInputChange} />
                        {errors.ngaysinh && <div className="invalid-feedback d-block">{errors.ngaysinh[0]}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="diachi">Địa chỉ</label>
                        <input type="text" placeholder='Địa Chỉ' className="form-control mt-3 mb-3" id="diachi" name="diachi" value={formData.diachi} onChange={handleInputChange} />
                        {errors.diachi && <div className="invalid-feedback d-block">{errors.diachi[0]}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="khoa">Khóa</label>
                        <input type="text" placeholder='Khóa' className="form-control mt-3 mb-3" id="khoa" name="khoa" value={formData.khoa} onChange={handleInputChange} />
                        {errors.khoa && <div className="invalid-feedback d-block">{errors.khoa[0]}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="manv">Mã nhân viên</label>
                        <select className="form-select custom-select mt-3 mb-3" id="manv" name="manv" value={formData.manv} onChange={handleInputChange}>
                        <option value="">Chọn mã nhân viên</option>
                            {manvOptions.map((option) => (
                                <option key={option.manv} value={option.manv}>{option.manv}</option>
                            ))}
                        </select>
                        {errors.manv && <div className="invalid-feedback d-block">{errors.manv[0]}</div>}
                    </div>
                    <div {...getRootProps()} className="dropzone mt-3">
                        <input {...getInputProps()} />
                        <p className={styles.dropzone}>Kéo và thả hoặc click để chọn file {JSON.stringify(formData.image)}</p>
                    </div>
                    </div>
                    <div className="card-footer text-right">
                        <button type="submit" className="btn btn-primary mr-2">{editingID ? 'Cập nhật' : 'Thêm Sinh viên'}</button>
                    </div>
                </form>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-12">
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">Mã SV</th>
                            <th scope="col">Họ tên</th>
                            <th scope="col">Giới tính</th>
                            <th scope="col">Lớp</th>
                            <th scope="col">Ngày sinh</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Khóa</th>
                            <th scope="col">Mã NV</th>
                            <th scope="col">Image</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sinhviens.map((sinhvien) => (
                            <tr key={sinhvien.masv}>
                            <td>{sinhvien.masv}</td>
                            <td>{sinhvien.hoten}</td>
                            <td>{sinhvien.gioitinh}</td>
                            <td>{sinhvien.lop}</td>
                            <td>{sinhvien.ngaysinh}</td>
                            <td>{sinhvien.diachi}</td>
                            <td>{sinhvien.khoa}</td>
                            <td>{sinhvien.manv}</td>
                            <td>
                                {sinhvien.image && <img src={`http://127.0.0.1:8000/${sinhvien.image}`} alt="Sinh viên" width={'100px'} height={'100px'} />}
                            </td>
                            <td>
                                <span className={styles.edit} onClick={() => handleEdit(sinhvien)}><i class="fa-regular fa-pen-to-square"></i></span>
                                <span className={styles.delete} onClick={() => handleDelete(sinhvien.masv)}><i class="fa-solid fa-trash"></i></span>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Sinhvien;
