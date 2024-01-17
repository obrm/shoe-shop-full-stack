import React, { createContext, useState, useEffect, useCallback } from "react";
import { toast } from 'react-toastify';

import { shoeAPI } from '../api';


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
      toast.error(err.response?.data?.error || 'An error occurred');
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
      toast.error(err.response?.data?.error || 'An error occurred');
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
      handleSuccess('Shoe added successfully');
      return response.data.id;
    } catch (err) {
      toast.error('An error occurred while adding the shoe');
    } finally {
      setIsLoading(false);
    }
  };

  const editShoe = async (shoe) => {
    setIsLoading(true);
    try {
      await shoeAPI.updateShoe(shoe, shoe.id);
      handleSuccess('Shoe updated successfully');
    } catch (err) {
      toast.error('An error occurred while updating the shoe');
    } finally {
      setIsLoading(false);
    }
  };

  const removeShoe = async (id) => {
    setIsLoading(true);
    try {
      await shoeAPI.deleteShoe(id);
      handleSuccess('Shoe deleted successfully');
    } catch (err) {
      toast.error('An error occurred while deleting the shoe');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = (message) => {
    fetchShoes();
    toast.success(message);
  }  

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
