import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MuonQuaHan = () => {
    const [phieumuons, setPhieumuons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
        const response = await axios.get('http://127.0.0.1:8000/api/baocao/phieumuons/quahan'); // Thay đổi đường dẫn API tương ứng
            setPhieumuons(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Danh sách phiếu mượn</h1>
                <table className="table table-bordered">
                <thead>
                    <tr>
                    <th scope="col">Mã phiếu mượn</th>
                    <th scope="col">Ngày mượn</th>
                    <th scope="col">Ngày trả</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Tình trạng sách</th>
                    <th scope="col">Mã sách</th>
                    <th scope="col">Mã sinh viên</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(phieumuons) && phieumuons.length > 0 ? phieumuons.map(phieumuon => (
                    <tr key={phieumuon.maphieumuon}>
                        <td>{phieumuon.maphieumuon}</td>
                        <td>{phieumuon.ngaymuon}</td>
                        <td>{phieumuon.ngaytra}</td>
                        <td>{phieumuon.soluong}</td>
                        <td>{phieumuon.tinhtrangsach}</td>
                        <td>{phieumuon.masach}</td>
                        <td>{phieumuon.masv}</td>
                    </tr>
                    )): <p>Không có dữ liệu</p>}
                </tbody>
                </table>
        </div>
    );
}

export default MuonQuaHan;