import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layout/Layout"; 
import GamePage from "./pages/GamePage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: "/profile",
          element: <ProfilePage />
        },
        {
          path: "/games/:gameId",
          element: <GamePage />
        }
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
