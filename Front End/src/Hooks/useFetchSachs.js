import { useEffect, useState } from 'react';
import { fetchSachs } from '../services/api/fetchSachs';

const useFetchSachs = () => {
    const [sachs, setSachs] = useState([]);

    useEffect(() => {
        fetchSachs(setSachs);
    }, []);

    return sachs;
};

export default useFetchSachs;
