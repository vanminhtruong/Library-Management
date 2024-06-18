import axios from 'axios';

const API_DANG_KY_THE = process.env.REACT_APP_API_THE_THU_VIEN;
export const DangKyThe = (formData) => {
    return axios.post(API_DANG_KY_THE, formData);
};