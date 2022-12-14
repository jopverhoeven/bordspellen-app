import { React } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ProtectedRoute from './component/ProtectedRoute';
import UnprotectedRoute from './component/UnprotectedRoute';
import { AuthContextProvider } from './context/AuthContext';
import GameLayout from './layout/GameLayout';
import Layout from "./layout/Layout";
import AddGamePage from './pages/games/AddGamePage';
import AddScorePage from './pages/games/scores/AddScorePage';
import DeleteGamePage from './pages/games/DeleteGamePage';
import DeleteScorePage from './pages/games/scores/DeleteScorePage';
import EditGamePage from './pages/games/EditGamePage';
import ErrorPage from './pages/ErrorPage';
import GamePage from "./pages/games/GamePage";
import HomePage from "./pages/HomePage";
import LoginPage from './pages/LoginPage';
import ScorePage from "./pages/games/scores/ScorePage";
import ScoreLayout from './layout/ScoreLayout';

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
              <GameLayout />
            </ProtectedRoute>,
          children: [
            {
              path: "",
              element: <GamePage />
            },
            {
              path: "add",
              element:
                  <AddScorePage />
            },
            {
              path: "edit",
              element:
                <ProtectedRoute>
                  <EditGamePage />
                </ProtectedRoute>
            },
            {
              path: "delete",
              element:
                <ProtectedRoute>
                  <DeleteGamePage />
                </ProtectedRoute>
            },
            {
              path: "scores/:scoreId",
              element: <ScoreLayout />,
              children: [
                {
                  path: "",
                  element: <ScorePage />
                },
                {
                  path: "delete",
                  element: <DeleteScorePage />
                }
              ]
            },
          ]
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
