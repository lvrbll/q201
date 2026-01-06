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
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

export default function App() {
  const [isLogged, setIsLogged] = useState(null);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  function updateLoginState(state) {
    setIsLogged(state);
  }

  async function fetchData() {
    const request = await fetch("/api", {credentials: 'include'});
    const isOK = request.ok;
    const status = request.status;
    if(isOK) {
      const data = await request.json();
      setIsLogged(data.isLogged);
      setUsername(data.username);
      navigate('/')
      return;
    }
    if(status === 401) {
      navigate('/');
      return;
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="app">
      {(!isLogged) ? 
      (
        <>
          <Routes>
            <Route path="/" element={<LogInPage onStateUpdate={updateLoginState}/>}/>
          </Routes>
        </>
      )
      : 
      (
        <>
          <LeftPanel />
            <Routes>
              <Route path="/" element={<MainPanel username={username}/>}/>
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
