import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { shoeAPI } from '../api/api';

import { useGlobalShoeContext } from './';

const useShoe = () => {
  const { shoeId } = useParams();

  const navigate = useNavigate();

  const [shoe, setShoe] = useState({});
  const [loading, setLoading] = useState(true);

  const { removeShoe } = useGlobalShoeContext();


  useEffect(() => {
    const fetchShoe = async () => {
      const shoeData = await shoeAPI.getShoe(shoeId);
      setShoe(shoeData.data.data);
      setLoading(false);
    };

    fetchShoe();
  }, [shoeId]);

  const handleDelete = () => {
    removeShoe(shoeId);
    navigate('/');
  };

  return { shoe, loading, handleDelete };
};
export default useShoe;