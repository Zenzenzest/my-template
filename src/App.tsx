import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./context/Theme";
import { DataProvider } from "./provider/Data_provider";
import SideNav from "./components/Nav/SideNav";
import LandingPage from "./page/Landing_page";

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <Routes>
          <Route element={<SideNav />}>
            <Route path="/" element={<LandingPage />} />
          </Route>
        </Routes>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
