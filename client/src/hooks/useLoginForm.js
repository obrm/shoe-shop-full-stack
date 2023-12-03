import { useState } from "react";
import { useNavigate } from 'react-router';

import { useGlobalAuthContext } from ".";

const useLogin = () => {
  const navigate = useNavigate();

  const { login } = useGlobalAuthContext();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: null,
    password: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors(prevState => (
      {
        ...prevState,
        [e.target.name]: null
      }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    const newErrors = {};

    if (formData.name.length < 3) {
      newErrors.name = "name must bo at least 3 characters long";
      isValid = false;
    }
    if (formData.password.length < 6) {
      newErrors.password = "password must bo at least 6 characters long";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      login(formData);
      navigate('/');
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit
  };
};

export default useLogin;