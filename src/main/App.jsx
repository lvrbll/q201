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
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthProvider } from "../components/AuthContext";

export default function App() {
  return (
    <div className="app">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LogInPage />} />

          <Route
          path="/*"
          element={
            <ProtectedRoute> 
              <LeftPanel />
              <Routes>
                <Route path="/homePage" element={<MainPanel/>}/>
                <Route path="/addNewCardPage" element={<AddNewCardPage />}/>
                <Route path="/settingsPage" element={<SettingsPage />}/>
                <Route path="/cardPage/:id" element={<CardPage />}/>
                <Route path="/cardPage/cardLearnPage/:id" element={<CardLearnPage />}/>
                <Route path="*" element={<NotFoundPage />}/>
              </Routes>
              <RightPanel />
            </ProtectedRoute>
          }/>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}
