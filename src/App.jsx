import { React } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ProtectedRoute from './component/ProtectedRoute';
import UnprotectedRoute from './component/UnprotectedRoute';
import { AuthContextProvider } from './context/AuthContext';
import Layout from "./layout/Layout";
import AddGamePage from './pages/AddGamePage';
import AddScorePage from './pages/AddScorePage';
import DeleteGamePage from './pages/DeleteGamePage';
import DeleteScorePage from './pages/DeleteScorePage';
import EditGamePage from './pages/EditGamePage';
import ErrorPage from './pages/ErrorPage';
import GamePage from "./pages/GamePage";
import HomePage from "./pages/HomePage";
import LoginPage from './pages/LoginPage';
import ScorePage from "./pages/ScorePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement:
        <Layout>
          <ProtectedRoute>
            <ErrorPage />
          </ProtectedRoute>
        </Layout>,
      children: [
        {
          path: "/login",
          element:
            <UnprotectedRoute>
              <LoginPage />
            </UnprotectedRoute>
        },
        {
          path: "/",
          element:
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
        },
        {
          path: "/games/add",
          element:
            <ProtectedRoute>
              <AddGamePage />
            </ProtectedRoute>
        },
        {
          path: "/games/:gameId",
          element:
            <ProtectedRoute>
              <GamePage />
            </ProtectedRoute>
        },
        {
          path: "/games/:gameId/add",
          element:
            <ProtectedRoute>
              <AddScorePage />
            </ProtectedRoute>
        },
        {
          path: "/games/:gameId/edit",
          element:
            <ProtectedRoute>
              <EditGamePage />
            </ProtectedRoute>
        },
        {
          path: "/games/:gameId/delete",
          element:
            <ProtectedRoute>
              <DeleteGamePage />
            </ProtectedRoute>
        },
        {
          path: "/games/:gameId/scores/:scoreId",
          element:
            <ProtectedRoute>
              <ScorePage />
            </ProtectedRoute>
        },
        {
          path: "/games/:gameId/scores/:scoreId/delete",
          element:
            <ProtectedRoute>
              <DeleteScorePage />
            </ProtectedRoute>
        }
      ],
    },
  ]);

  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
