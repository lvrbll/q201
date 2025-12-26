import LeftPanel from "../components/LeftPanel";
import MainPanel from "../components/MainPanel";
import RightPanel from "../components/RightPanel";
import "../styles/main_styles/App.css"

export default function App() {
  return (
    <div className="app">
        <LeftPanel />
        <MainPanel />
        <RightPanel />
    </div>
  );
}
