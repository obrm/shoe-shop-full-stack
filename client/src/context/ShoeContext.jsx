import React, { createContext, useState, useEffect, useCallback } from "react";

import { shoeAPI } from '../api';

import { showToast } from '../utils';

export const ShoeContext = createContext();

export const ShoeProvider = ({ children }) => {
  const [shoes, setShoes] = useState([]);
  const [currentShoe, setCurrentShoe] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchShoes = async () => {
    setIsLoading(true);
    try {
      const response = await shoeAPI.getAllShoes();
      setShoes(response.data);
    } catch (err) {
      showToast(err.response?.data?.error || 'An error occurred', 'error');
      console.error((err.response?.data?.error || 'An error occurred', 'error'));
    } finally {
      setIsLoading(false);
    }
  };

  const fetchShoe = useCallback(async (shoeId) => {
    setIsLoading(true);
    try {
      const response = await shoeAPI.getShoe(shoeId);
      setCurrentShoe(response.data);
    } catch (err) {
      showToast(err.response?.data?.error || 'An error occurred', 'error');
      console.error((err.response?.data?.error || 'An error occurred', 'error'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShoes();
  }, []);

  const addNewShoe = async (shoe) => {
    setIsLoading(true);
    try {
      const response = await shoeAPI.addShoe(shoe);
      showToast('Shoe added successfully');
      return response.data.id;
    } catch (err) {
      handleError('An error occurred while adding the shoe');
    } finally {
      setIsLoading(false);
    }
  };

  const editShoe = async (shoeData) => {
    setIsLoading(true);
    try {
      const response = await shoeAPI.updateShoe(shoeData, shoeData.id);
      setCurrentShoe(response.data);
      showToast('Shoe updated successfully');
    } catch (err) {
      handleError('An error occurred while updating the shoe');
    } finally {
      setIsLoading(false);
    }
  };

  const removeShoe = async (id) => {
    setIsLoading(true);
    try {
      await shoeAPI.deleteShoe(id);
      showToast('Shoe deleted successfully');
      fetchShoes();
    } catch (err) {
      handleError('An error occurred while deleting the shoe');
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (err, message) => {
    showToast(message, 'error');
    console.error((err.response?.data?.error || 'An error occurred', 'error'));
  };

  return (
    <ShoeContext.Provider
      value={{
        shoes,
        currentShoe,
        isLoading,
        fetchShoe,
        addNewShoe,
        editShoe,
        removeShoe,
      }}>
      {children}
    </ShoeContext.Provider>
  );
};
