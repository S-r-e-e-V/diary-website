import React, { createContext, useState } from "react";

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const [isopenMenu, setisopenMenu] = useState(false);
  const value = {
    isopenMenu,
    setisopenMenu,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
