import AddNewCardPage from "../components/pages/AddNewCardPage";
import MainPanel from "../components/pages/MainPanel";
import LogInPage from "../components/pages/LogInPage";
import SettingsPage from "../components/pages/SettingsPage";
import CardPage from "../components/pages/CardPage";
import CardLearnPage from "../components/pages/CardLearnPage";
import NotFoundPage from "../components/pages/NotFoundPage";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
import "../styles/main_styles/App.css";
import { Routes, Route } from 'react-router-dom';
import { useState } from "react";

export default function App() {
  const [isLogged, setIsLogged] = useState(true);

  return (
    <div className="app">
      {(!isLogged) ? 
      (
        <>
          <Routes>
            <Route path="/" element={<LogInPage />}/>
          </Routes>
        </>
      )
      : 
      (
      <>
        <LeftPanel />
        <Routes>
          <Route path="/" element={<MainPanel />}/>
          <Route path="/addNewCardPage" element={<AddNewCardPage />}/>
          <Route path="/settingsPage" element={<SettingsPage />}/>
          <Route path="/cardPage/:id" element={<CardPage />}/>
          <Route path="/cardPage/cardLearnPage/:id" element={<CardLearnPage />}/>
          <Route path="*" element={<NotFoundPage />}/>
        </Routes>
        <RightPanel />
      </>
      ) 
      }
    </div>
  );
}
