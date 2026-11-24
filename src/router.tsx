import { createBrowserRouter, Outlet } from "react-router";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { redirectIfAuthed, requireAuth } from "@/lib/authGuards";
import { titled } from "@/lib/routeHandle";
import { DashboardPage } from "@/pages/DashboardPage";
import { LoginPage } from "@/pages/LoginPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { PlaceholderPage } from "@/pages/PlaceholderPage";
import { RegisterPage } from "@/pages/RegisterPage";
import Home from "./pages/Home";
import { RootLayout } from "./layouts/RootLayout";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },

      // Guest-only pages. The loader sits on the layout route so it covers every child.
      {
        element: <AuthLayout />,
        loader: redirectIfAuthed,
        children: [
          { path: "/login", element: <LoginPage /> },
          { path: "/register", element: <RegisterPage /> },
        ],
      },

      // Logged-in pages. DashboardLayout receives <Outlet /> as its typed `children`;
      // React Router fills that outlet with whichever child route matches. One loader
      // on this route protects every page below, including ones added later.
      {
        element: (
          <DashboardLayout>
            <Outlet />
          </DashboardLayout>
        ),
        loader: requireAuth,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
            handle: titled("Dashboard"),
          },
          {
            path: "/projects",
            element: <PlaceholderPage />,
            handle: titled("Projects"),
          },
          {
            path: "/projects/:projectId",
            element: <PlaceholderPage />,
            handle: titled("Project"),
          },
          {
            path: "/tasks",
            element: <PlaceholderPage />,
            handle: titled("Tasks"),
          },
          {
            path: "/learning",
            element: <PlaceholderPage />,
            handle: titled("Learning"),
          },
          {
            path: "/learning/:technology",
            element: <PlaceholderPage />,
            handle: titled("Technology"),
          },
          {
            path: "/notes",
            element: <PlaceholderPage />,
            handle: titled("Notes"),
          },
          {
            path: "/analytics",
            element: <PlaceholderPage />,
            handle: titled("Analytics"),
          },
          {
            path: "/profile",
            element: <PlaceholderPage />,
            handle: titled("Profile"),
          },
          {
            path: "/settings",
            element: <PlaceholderPage />,
            handle: titled("Settings"),
          },
        ],
      },

      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
