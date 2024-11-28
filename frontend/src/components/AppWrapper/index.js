import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

// Initialize the Query Client
const queryClient = new QueryClient();

const AppWrapper = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <main>{children}</main>
      <Toaster position="top-center" reverseOrder={false} />
    </QueryClientProvider>
  );
};

export default AppWrapper;
