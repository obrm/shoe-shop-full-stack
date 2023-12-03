import React, { createContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';

import { shoeAPI } from '../api/api';

export const ShoeContext = createContext();

export const ShoeProvider = ({ children }) => {
  const [shoes, setShoes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchShoes = async () => {
    try {
      const shoesData = await shoeAPI.getAllShoes();
      setShoes(shoesData.data.data);
    } catch (err) {
      setError(err.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShoes();
  }, []);

  const addNewShoe = async (shoe) => {
    try {
      setIsLoading(true);
      const newShoe = await shoeAPI.addShoe(shoe);
      setShoes(prevShoes => ([...prevShoes, newShoe]));
      fetchShoes();
      showToast('Shoe added successfully');
    } catch (err) {
      setError(err.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  const editShoe = async (shoeData) => {
    try {
      setIsLoading(true);
      const updatedShoe = await shoeAPI.updateShoe(shoeData.id, shoeData);
      setShoes((prevShoes) =>
        prevShoes.map((shoe) => (shoe.id === shoeData.id ? updatedShoe : shoe))
      );
      fetchShoes();
      showToast('Shoe updated successfully');
    } catch (err) {
      setError(err.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeShoe = async (id) => {
    try {
      setIsLoading(true);
      await shoeAPI.deleteShoe(id);
      setShoes((prevShoes) =>
        prevShoes.filter((shoe) => (shoe.id !== id))
      );
      fetchShoes();
      showToast('Shoe deleted successfully');
    } catch (err) {
      setError(err.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const showToast = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  };
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
