import { React } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ProtectedRoute from './component/ProtectedRoute';
import UnprotectedRoute from './component/UnprotectedRoute';
import { AuthContextProvider } from './context/AuthContext';
import Layout from "./layout/Layout";
import GamePage from "./pages/GamePage";
import HomePage from "./pages/HomePage";
import LoginPage from './pages/LoginPage';
import ProfilePage from "./pages/ProfilePage";
import ScorePage from "./pages/ScorePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
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
          path: "/profile",
          element:
            <ProtectedRoute>
              <ProfilePage />
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
          path: "/games/:gameId/scores/:scoreId",
          element:
            <ProtectedRoute>
              <ScorePage />
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
