import { createContext, useContext } from "react";
// import data types

export type DataContextType = {
  //  data here
  loading: boolean;
  error: string | null;
  loadingProgress: number;
  showUpdateNotification: boolean;
  latestVersion: string | null;
  handleUpdate: () => void;
  checkForUpdates?: () => Promise<void>;
};

export const DataContext = createContext<DataContextType | undefined>(
  undefined,
);

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a ProsekaDataProvider");
  }
  return context;
}
