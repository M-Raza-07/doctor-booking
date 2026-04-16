import React, { createContext, useContext, type ReactNode } from "react";
import { doctors as initialDoctors, type Doctor } from "../assets/assets";

interface AppContextType {
  doctors: Doctor[];
  setDoctors: React.Dispatch<React.SetStateAction<Doctor[]>>;
  currencySymbol: string;
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
  const [doctorList, setDoctorList] = React.useState<Doctor[]>(initialDoctors);

  const currencySymbol = "$";

  const value: AppContextType = {
    doctors: doctorList,
    setDoctors: setDoctorList,
    currencySymbol,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
