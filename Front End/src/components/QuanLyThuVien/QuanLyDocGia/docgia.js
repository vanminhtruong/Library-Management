import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

const Docgia = () => {
    const [data, setData] = useState([]);
    const [searchMasv, setSearchMasv] = useState('');
    const [searchTensach, setSearchTensach] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
        const response = await axios.get('http://127.0.0.1:8000/information');
        setData(response.data);
        } catch (error) {
        console.error('Error fetching data:', error);
        }
    };

    const handleSearch = async () => {
        try {
            let url = '';
            if (searchMasv) {
                url = 'http://127.0.0.1:8000/api/search/masv';
                const response = await axios.get(`${url}/${searchMasv}`);
                console.log("masv: "+JSON.stringify(response.data))
                setData(response.data);
            } else if (searchTensach) {
                url = 'http://127.0.0.1:8000/api/search/hoten';
                const response = await axios.get(`${url}/${searchTensach}`);
                setData(response.data);
            } else {
                fetchData();
            }
            } catch (error) {
            console.error('Error searching data:', error);
        }
    };

    const handleNextPage = (item) => (e) => {
        e.preventDefault();
        return navigate('/bienban', { state: { masv: item.masv, masach: item.masach } })
    }

    return (
        <div className="container text-white"><br/>
        <h1 className="mb-4 mt-5">Danh Sách Độc Giả</h1>
        <div className="d-flex mb-3">
            <div className="flex-grow-1 me-2">
            <label>Mã SV:</label>
            <input
                type="text"
                className="form-control"
                placeholder='Mã Sinh Viên'
                value={searchMasv}
                onChange={(e) => setSearchMasv(e.target.value)}
                required
            />
            </div>
            <div className="flex-grow-1 me-2">
            <label>Tên sách:</label>
            <input
                type="text"
                className="form-control"
                placeholder='Tên Sách'
                value={searchTensach}
                onChange={(e) => setSearchTensach(e.target.value)}
            />
            </div>
            <button className="btn btn-primary me-2 flex-shrink-0 h-100 mt-4" onClick={handleSearch}>Tìm kiếm</button>
            <button className="btn btn-secondary flex-shrink-0 h-100 mt-4" onClick={fetchData}>Xem tất cả</button>
        </div>
        <table className="table table-striped">
            <thead>
            <tr>
                <th style={{backgroundColor: "#FF0000"}}>Mã SV</th>
                <th style={{backgroundColor: "#FFA500"}}>Mã sách</th>
                <th style={{backgroundColor: "#FFFF00"}}>Tên sách</th>
                <th style={{backgroundColor: "#00FF00"}}>Tình trạng sách</th>
                <th style={{backgroundColor: "#0000FF"}}>Họ tên</th>
                <th style={{backgroundColor: "#4B0082"}}>Giới tính</th>
                <th style={{backgroundColor: "#800080"}}>Ngày mượn</th>
                <th style={{backgroundColor: "#FF00FF"}}>Ngày trả</th>
                <th style={{backgroundColor: "#FFFF00"}}>Xử Lý Vi Phạm</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                <td>{item.masv}</td>
                <td>{item.masach}</td>
                <td>{item.tensach}</td>
                <td>{item.tinhtrangsach}</td>
                <td>{item.hoten}</td>
                <td>{item.gioitinh}</td>
                <td>{item.ngaymuon}</td>
                <td>{item.ngaytra}</td>
                <td>
                    <div onClick={handleNextPage(item)} className='btn text-danger border-0 fs-4'>
                        <i class="fa-solid fa-arrow-right"></i>
                    </div>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  );
}

export default Docgia;