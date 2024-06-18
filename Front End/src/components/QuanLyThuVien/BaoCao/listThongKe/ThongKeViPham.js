import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ThongKeViPham = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const result = await axios.get('http://127.0.0.1:8000/api/baocao/bienbans'); // Thay 'your-api-endpoint' bằng đường dẫn của API của bạn
            setData(result.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, []);

    return (
        <div>
        <h1>Danh sách biên bản vi phạm</h1>
        <table>
            <thead>
            <tr>
                <th>Mã biên bản</th>
                <th>Mã sinh viên</th>
                <th>Họ và tên sinh viên</th>
                <th>Mã sách</th>
                <th>Lỗi vi phạm</th>
                <th>Biện pháp xử lý</th>
                <th>Ngày</th>
                
            </tr>
            </thead>
            <tbody>
            {data.map(item => (
                <tr key={item.mabienban}>
                <td>{item.mabienban}</td>
                <td>{item.masv}</td>
                <td>{item.hoten}</td> {/* Lấy tên của sinh viên từ item.sinhviens */}
                <td>{item.masach}</td>
                <td>{item.loivipham}</td>
                <td>{item.bienphapxuly}</td>
                <td>{item.ngay}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default ThongKeViPham;