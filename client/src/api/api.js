import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const request = async (method, endpoint, data = null) => {
    const res = await axios({
        method,
        url: `${BASE_URL}${endpoint}`,
        data,
    });
    return res.data;
};

export const getAllShoes = async () => {
    return await request('get', '/');
};

export const getShoe = async (shoeId) => {
    return await request('get', `/${shoeId}`);
};

export const updateShoe = async (shoe, shoeId) => {
    return await request('put', `/${shoeId}`, shoe);
};

export const addShoe = async (shoe) => {
    return await request('post', '/', shoe);
};

export const deleteShoe = async (shoeId) => {
    return await request('delete', `/${shoeId}`);
};
