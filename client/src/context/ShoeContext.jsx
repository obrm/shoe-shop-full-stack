import React, { createContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';

import { addShoe, updateShoe, deleteShoe, getAllShoes } from '../api/api';

export const ShoeContext = createContext();

export const ShoeProvider = ({ children }) => {
  const [shoes, setShoes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchShoes = async () => {
    try {
      const shoesData = await getAllShoes();
      setShoes(shoesData);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShoes();
  }, []);

  const addNewShoe = async (shoe) => {
    try {
      const newShoe = await addShoe(shoe);
      setShoes(prevShoes => ([...prevShoes, newShoe]));
      showToast('Shoe added successfully');
    } catch (err) {
      setError(err.message);
    }
  };

  const editShoe = async (shoeData) => {
    try {
      const updatedShoe = await updateShoe(shoeData, shoeData.id);
      setShoes((prevShoes) =>
        prevShoes.map((shoe) => (shoe.id === shoeData.id ? updatedShoe : shoe))
      );
      showToast('Shoe updated successfully');
    } catch (err) {
      setError(err.message);
    }
  };

  const removeShoe = async (id) => {
    try {
      await deleteShoe(id);
      setShoes((prevShoes) =>
        prevShoes.filter((shoe) => (shoe.id !== id))
      );
      showToast('Shoe deleted successfully');
    } catch (err) {
      setError(err.message);
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
  }
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
