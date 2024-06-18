import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { LoadMASV } from '../services/api/LoadMaSV';

export const useTheThuVien = () => {
    const [sinhVienList, setSinhVienList] = useState([]);

    useEffect(() => {
    // Gọi API Axios để tải danh sách sinh viên từ server
        LoadMASV()
        .then(response => {
            setSinhVienList(response.data);
            console.log("is: "+JSON.stringify(response.data));
        })
        .catch(error => {
            console.error('Lỗi khi tải danh sách sinh viên:', error);
        });
    }, []); 

    return sinhVienList;
}