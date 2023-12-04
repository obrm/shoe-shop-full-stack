import React, { createContext, useState, useEffect, useCallback } from "react";
import { toast } from 'react-toastify';
import { shoeAPI } from '../api/api';

export const ShoeContext = createContext();

export const ShoeProvider = ({ children }) => {
  const [shoes, setShoes] = useState([]);
  const [currentShoe, setCurrentShoe] = useState({});
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

  const fetchShoe = useCallback(async (shoeId) => {
    setIsLoading(true);
    try {
      const response = await shoeAPI.getShoe(shoeId);
      setCurrentShoe(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

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
      let response = null;
      if (!shoe) {
        await action(id);
      } else if (id) {
        response = await action(shoe, id);
      } else {
        response = await action(shoe);
      }

      showToast('Operation successful');
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
  const removeShoe = (id) => handleShoeAction(() => shoeAPI.deleteShoe(id), null, id);

  const clearError = () => setError(null);

  return (
    <ShoeContext.Provider
      value={{
        shoes,
        currentShoe,
        isLoading,
        error,
        fetchShoe,
        addNewShoe,
        editShoe,
        removeShoe,
        clearError
      }}>
      {children}
    </ShoeContext.Provider>
  );
};
