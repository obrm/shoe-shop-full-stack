import React, { createContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { shoeAPI } from '../api/api';

export const ShoeContext = createContext();

export const ShoeProvider = ({ children }) => {
  const [shoes, setShoes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchShoes = async () => {
    setIsLoading(true);
    try {
      const response = await shoeAPI.getAllShoes();
      setShoes(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShoes();
  }, []);

  const showToast = (message, type = 'success') => {
    toast[type](message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  };

  const handleShoeAction = async (action, shoe, id = null) => {
    setIsLoading(true);
    try {
      const response = id ? await action(shoe, id) : await action(shoe);
      if (response) {
        setShoes((prevShoes) =>
          prevShoes.map((item) => (item.id === shoe.id ? response : item))
        );
      } else {
        setShoes(prevShoes => prevShoes.filter(item => item.id !== shoe.id));
      }
      showToast('Shoe operation successful');
      fetchShoes();
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
      showToast('Error in shoe operation', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const addNewShoe = (shoe) => handleShoeAction(shoeAPI.addShoe, shoe);
  const editShoe = (shoeData) => handleShoeAction(shoeAPI.updateShoe, shoeData, shoeData.id);
  const removeShoe = (id) => handleShoeAction(() => shoeAPI.deleteShoe(id), { id });

  const clearError = () => setError(null);

  return (
    <ShoeContext.Provider
      value={{
        shoes,
        isLoading,
        error,
        addNewShoe,
        editShoe,
        removeShoe,
        clearError
      }}>
      {children}
    </ShoeContext.Provider>
  );
};
