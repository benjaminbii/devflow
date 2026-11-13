import { createBrowserRouter, Outlet } from "react-router";
import { ScrollManager } from "./components/layout/ScrollManager";
import Home from "./pages/Home";
import { AuthLayout } from "./components/layout/AuthLayout";
import { redirectIfAuthed, requireAuth } from "./lib/authGuards";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import { AppLayout } from "./components/layout/AppLayout";
import { NotFoundPage } from "./pages/NotFoundPage";

function RootLayout() {
  return (
    <>
      <ScrollManager />
      <Outlet />
    </>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      // Guest-only pages. The loader sits on the layout route so it covers
      // every child without repeating it.
      {
        element: <AuthLayout />,
        loader: redirectIfAuthed,
        children: [
          { path: "/login", element: <LoginPage /> },
          { path: "/register", element: <RegisterPage /> },
        ],
      },
      // Logged-in pages. One loader on the layout route protects them all, so a
      // page added later is protected by default.
      {
        element: <AppLayout />,
        loader: requireAuth,
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/projects", element: <PlaceholderPage title="Projects" /> },
          {
            path: "/projects/:projectId",
            element: <PlaceholderPage title="Project" />,
          },
          { path: "/tasks", element: <PlaceholderPage title="Tasks" /> },
          { path: "/learning", element: <PlaceholderPage title="Learning" /> },
          {
            path: "/learning/:technology",
            element: <PlaceholderPage title="Technology" />,
          },
          { path: "/notes", element: <PlaceholderPage title="Notes" /> },
          {
            path: "/analytics",
            element: <PlaceholderPage title="Analytics" />,
          },
          { path: "/profile", element: <PlaceholderPage title="Profile" /> },
          { path: "/settings", element: <PlaceholderPage title="Settings" /> },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
