"use client";

import React from "react";
import { Toaster } from "react-hot-toast";

export const RootLayoutWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};
