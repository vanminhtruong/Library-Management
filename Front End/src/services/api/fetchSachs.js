import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL_BOOKS;

export const fetchSachs = async (setSachs) => {
    try {
        const response = await axios.get(`${API_URL}/sachs`);
        setSachs(response.data);
    } catch (error) {
        console.error('Error fetching sachs:', error);
    }
};
