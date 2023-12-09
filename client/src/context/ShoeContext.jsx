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
      setShoes(response.data.data);
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
      setCurrentShoe(response.data.data);
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

  const handleShoeAction = async (action, operation, shoe, id = null) => {
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

      showToast(`Shoe ${operation}ed successfully`);
      fetchShoes();
    } catch (err) {
      showToast(`An error occurred while ${operation}ing the shoe`, 'error');
      console.error((err.response?.data?.error || 'An error occurred', 'error'));
    } finally {
      setIsLoading(false);
    }
  };

  const addNewShoe = (shoe) => handleShoeAction(shoeAPI.addShoe, 'add', shoe);
  const editShoe = (shoeData) => handleShoeAction(shoeAPI.updateShoe, 'updat', shoeData, shoeData.id);
  const removeShoe = (id) => handleShoeAction(() => shoeAPI.deleteShoe(id), 'delet', null, id);

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
