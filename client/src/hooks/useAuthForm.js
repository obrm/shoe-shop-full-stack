import { useState } from "react";
import { useNavigate } from 'react-router';
import { useGlobalAuthContext } from ".";

const useAuthForm = (isRegister) => {  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });  
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null
  });

  const { login, register } = useGlobalAuthContext();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors(prevState => ({
      ...prevState,
      [e.target.name]: null
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    const newErrors = {};

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

    if (isRegister) {
      if (formData.name.length < 3) {
        newErrors.name = "Name must be at least 3 characters long";
        isValid = false;
      }
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = "password must bo at least 6 characters long";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      if (isRegister) {
        register(formData);
      } else {
        login(formData.email, formData.password);
      }
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

export default useAuthForm;
