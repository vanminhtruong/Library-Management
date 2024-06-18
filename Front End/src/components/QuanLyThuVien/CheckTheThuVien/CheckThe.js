import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { json, useNavigate } from 'react-router-dom';

const CheckThe = () => {
  const [mathe, setMathe] = useState('');
  const [thoigiancap, setThoigiancap] = useState('');
  const [hsd, setHsd] = useState('');
  const [masv, setMasv] = useState('');
  const [error, setError] = useState(null);
  const [duplicate, setDuplicate] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post('http://127.0.0.1:8000/checkthe', {
            mathe,
            thoigiancap,
            hsd,
            masv,
        });

        if (response.data.duplicate) {
            setDuplicate(true);
        } else {
            setDuplicate(false);
        }
        console.log("token: "+response.data.token)
        localStorage.setItem('tokenLogin', response.data.token);
        alert("Login Libary successfully");
        navigate('/muontra');
    } catch (error) {
        alert("Login Libary Faild");
        setError(error.message);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Kiểm tra thông tin trùng khớp</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mã thẻ"
                    value={mathe}
                    onChange={(e) => setMathe(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Thời gian cấp"
                    value={thoigiancap}
                    onChange={(e) => setThoigiancap(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Hạn sử dụng"
                    value={hsd}
                    onChange={(e) => setHsd(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mã sinh viên"
                    value={masv}
                    onChange={(e) => setMasv(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Kiểm tra trùng khớp</button>
              </form>
              {error && <p className="text-danger mt-3">{error}</p>}
              {duplicate && <p className="text-success mt-3">Bản ghi trùng khớp được tìm thấy.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckThe;