import { useState } from 'react';

import { useAuthForm } from '../hooks';

import { Input } from '../components';

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const {
    formData,
    errors,
    handleChange,
    handleSubmit
  } = useAuthForm(isRegister);

  const fields = [
    {
      id: 1,
      name: 'Name',
      inputName: 'name',
      value: formData.name,
      type: 'text',
      error: errors.name
    },
    {
      id: 2,
      name: 'Email',
      inputName: 'email',
      value: formData.email,
      type: 'text',
      error: errors.email
    },
    {
      id: 3,
      name: 'Password',
      inputName: 'password',
      value: formData.password,
      type: 'password',
      error: errors.password
    },
  ];

  const mapFields = isRegister ? fields : fields.slice(1);

  return (
    <section className="single-column-container">
      <h2>{isRegister ? 'Register' : 'Log In'}</h2>
      <form onSubmit={handleSubmit}>
        {mapFields.map(field => (
          <Input key={field.id} {...field} handleChange={handleChange} />
        ))}
        <button
          className="btn update-btn"
          type="submit"
        >
          {isRegister ? 'Register' : 'Log In'}
        </button>
        <p
          className='switch'
          onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Already have an account? Log In' : "Don't have an account yet? Register"}
        </p>
      </form>
    </section>
  );
};

export default Auth;
