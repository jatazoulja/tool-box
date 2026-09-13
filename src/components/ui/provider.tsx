import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export interface ProviderProps {
  children: React.ReactNode;
}

const getInitialTheme = () => {
  const storedTheme = window.localStorage.getItem("theme");

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export function Provider({ children }: ProviderProps) {
  const [theme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    root.style.colorScheme = theme;
  }, [theme]);

  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
}

export default Provider;
