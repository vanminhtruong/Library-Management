import axios from 'axios';

const API_URL_SINHVIENS = process.env.REACT_APP_API_URL_SINHVIENS;

export const fetchSinhviens = async (setSinhviens) => {
    try {
        const response = await axios.get(API_URL_SINHVIENS);
        setSinhviens(response.data);
    } catch (error) {
        console.error('Error fetching sinhviens:', error);
    }
};
