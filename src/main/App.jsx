import AddNewCardPage from "../components/pages/AddNewCardPage";
import MainPanel from "../components/pages/MainPanel";
import AccountSettingsPage from "../components/pages/AccountSettingsPage"
import LogInPage from "../components/pages/LogInPage"
import NotFoundPage from "../components/pages/NotFoundPage";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
import "../styles/main_styles/App.css";
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <div className="app">

        <LeftPanel />
        <Routes>
          <Route path="/" element={<MainPanel />}/>
          <Route path="/addNewCardPage" element={<AddNewCardPage />}/>
          <Route path="/accountSettings" element={<AccountSettingsPage />}/>
          <Route path="/logInPage" element={<LogInPage />}/>
          <Route path="*" element={<NotFoundPage />}/>
        </Routes>
        <RightPanel />
        
    </div>
  );
}
