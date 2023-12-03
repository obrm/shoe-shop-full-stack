import { useEffect, useRef } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { useGlobalShoeContext } from './hooks';

import {
  LogIn,
  Home,
  Shoe,
  ManageShoe,
  NotFound
} from './pages';

import { ProtectedRoute, SharedLayout } from './components';

const routes = [
  {
    path: '/',
    element: <SharedLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'add',
        element: <ProtectedRoute><ManageShoe /> </ProtectedRoute>,
      },
      {
        path: 'logIn',
        element: <LogIn />,
      },
      {
        path: 'products',
        children: [
          {
            path: ':shoeId',
            element: <Shoe />
          },
          {
            path: ':shoeId/edit',
            element: <ProtectedRoute> <ManageShoe /></ProtectedRoute>
          }
        ]
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  },
];

function App() {
  const router = createBrowserRouter(routes);

  const toastId = useRef(null);

  const { error, clearError } = useGlobalShoeContext();

  useEffect(() => {
    if (error) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(error, {
          position: "top-center",
          onClose: () => clearError()
        });
      }
    }
  }, [error, clearError]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;