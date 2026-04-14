import React, { createContext, useContext, type ReactNode } from "react";
import { doctors, type Doctors } from "../assets/assets";

interface AppContextType {
  doctors: Doctors[];
  currencySymbol: string
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

const AppContextProvider = ({ children }: AppProviderProps) => {
  const currencySymbol = "$";
  const value: AppContextType = {
    doctors,
    currencySymbol,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
