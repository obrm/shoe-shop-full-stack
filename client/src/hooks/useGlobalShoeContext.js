import { useContext } from "react";

import { ShoeContext } from '../context/ShoeContext';

export const useGlobalShoeContext = () => {
  return useContext(ShoeContext);
};