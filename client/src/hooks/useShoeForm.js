import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { shoeAPI } from '../api';
import { useGlobalShoeContext } from './useGlobalShoeContext';

const useShoeForm = (shoeId) => {
    const navigate = useNavigate();

    const [shoe, setShoe] = useState({
        name: '',
        brand: '',
        image: '',
        price: '',
    });
    const [errors, setErrors] = useState({
        name: null,
        brand: null,
        image: null,
        price: null
    });
    const [loading, setLoading] = useState(false);

    const { addNewShoe, editShoe } = useGlobalShoeContext();

    useEffect(() => {
        if (shoeId) {
            setLoading(true);
            const fetchShoe = async () => {
                const shoeData = await shoeAPI.getShoe(shoeId);
                setShoe(shoeData.data.data);
                setLoading(false);
            };

            fetchShoe();
        }
    }, [shoeId]);

    const handleChange = (e) => {
        setShoe({
            ...shoe,
            [e.target.name]: e.target.value,
        });
        setErrors(prevState => (
            {
                ...prevState,
                [e.target.name]: null
            }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        const newErrors = {};

        const imgRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg))/;

        // Validation for 'name'
        if (shoe.name.length < 3) {
            newErrors.name = 'name must be at least 3 characters long';
            isValid = false;
        }

        // Validation for 'brand'
        if (shoe.brand.length < 2) {
            newErrors.brand = 'brand must be at least 2 characters long';
            isValid = false;
        }

        // Validation for 'image'
        if (!imgRegex.test(shoe.image)) {
            newErrors.image = 'img url is not valid';
            isValid = false;
        }

        // Validation for 'price'
        if (shoe.price < 1) {
            newErrors.price = 'Price must be greater than 1$';
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            if (shoeId) {
                editShoe(shoe);
            } else {
                addNewShoe(shoe);
            }
            navigate('/');
        }
    };



    return { shoe, loading, errors, handleChange, handleSubmit };
};

export default useShoeForm;