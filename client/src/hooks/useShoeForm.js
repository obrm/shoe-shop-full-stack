import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { shoeAPI } from '../api/api';
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

    const { addNewShoe, editShoe } = useGlobalShoeContext();

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

        const validationRules = [
            {
                field: 'name',
                test: val => val.length >= 3,
                errorMessage: 'name must be at least 3 characters long',
            },
            {
                field: 'brand',
                test: val => val.length >= 2,
                errorMessage: 'brand must be at least 2 characters long',
            },
            {
                field: 'image',
                test: val => imgRegex.test(val),
                errorMessage: 'img url is not valid',
            },
            {
                field: 'price',
                test: val => val >= 1,
                errorMessage: 'Price must be greater than 1$',
            }
        ];

        validationRules.forEach(({ field, test, errorMessage }) => {
            if (!test(shoe[field])) {
                newErrors[field] = errorMessage;
                isValid = false;
            }
        });

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