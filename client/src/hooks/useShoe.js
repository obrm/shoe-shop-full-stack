import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { getShoe } from '../api/api';

import { useGlobalShoeContext } from './';

const useShoe = () => {
  const { shoeId } = useParams();

  const navigate = useNavigate();

  const [shoe, setShoe] = useState({});

  const { removeShoe } = useGlobalShoeContext();


  useEffect(() => {
    const fetchShoe = async () => {
      const shoeData = await getShoe(shoeId);
      setShoe(shoeData);
    };

    fetchShoe();
  }, [shoeId]);

  const handleDelete = () => {
    removeShoe(shoeId);
    navigate('/');
  };

  return { shoe, handleDelete };
};
export default useShoe;