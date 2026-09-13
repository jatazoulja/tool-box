import React, { Suspense } from "react";
import { Center, Spinner } from "@chakra-ui/react";
import { createBrowserRouter, Navigate } from "react-router-dom";

const PageLoader = () => (
  <Center minH="100vh">
    <Spinner size="xl" color="blue.500" />
  </Center>
);

const Converter = React.lazy(() => import("@/screen/Converter"));
const ConverterCategory = React.lazy(
  () => import("@/screen/Converter/Category"),
);
const DeveloperTools = React.lazy(() => import("@/screen/DeveloperTools"));
const DeveloperToolsCategory = React.lazy(
  () => import("@/screen/DeveloperTools/Category"),
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/converter" replace />,
  },
  {
    path: "/converter",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Converter />
      </Suspense>
    ),
  },
  {
    path: "/converter/:categoryId",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ConverterCategory />
      </Suspense>
    ),
  },
  {
    path: "/developer-tools",
    element: (
      <Suspense fallback={<PageLoader />}>
        <DeveloperTools />
      </Suspense>
    ),
  },
  {
    path: "/developer-tools/:categoryId",
    element: (
      <Suspense fallback={<PageLoader />}>
        <DeveloperToolsCategory />
      </Suspense>
    ),
  },
  { path: "*", element: <Navigate to="/converter" replace /> },
]);
