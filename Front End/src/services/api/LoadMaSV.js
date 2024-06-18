import axios from 'axios';
import React from 'react';


const API_URL_LOAD_DU_LIEU = process.env.REACT_APP_API_LOAD_DU_LIEU;

export const LoadMASV = () => {
    return axios.get(API_URL_LOAD_DU_LIEU)
};