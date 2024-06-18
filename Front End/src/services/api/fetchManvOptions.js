import axios from 'axios';

const API_URL_NHANVIENS = process.env.REACT_APP_API_URL_NHANVIENS;

export const fetchManvOptions = async (setManvOptions) => {
    try {
        const response = await axios.get(API_URL_NHANVIENS);
        setManvOptions(response.data);
        console.log("manv: " + JSON.stringify(response.data));
    } catch (error) {
        console.error('Error fetching manv options:', error);
    }
};
