import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/Main/Layout';
import { RequireAuth } from './helpers/RequireAuth';
import Notes from './pages/Notes/Notes';
import Note from './pages/Note/Note';
import ErrorPage from './pages/Error/Error';
import AuthPage from './pages/Auth/Auth';
import AddNote from './components/AddNote/AddNote';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth><Layout /></RequireAuth>,
    children: [
      {
        path: '/',
        element: <Notes />
      },
      {
        path: '/note/:id',
        element: <Note />,
        errorElement: <>Ошибка</>,
      },
      {
        path: '/add-note',
        element: <AddNote />
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '*',
    element: <ErrorPage />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
