import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalAuthContext } from '../hooks';

const ProtectedRoute = ({ children }) => {
  const { user } = useGlobalAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user?.role === 'admin') {
      navigate('/');
    }
  }, [navigate, user]);

  return children;
};

export default ProtectedRoute;