import { HashRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import SettingsModal from "./components/SettingsModal";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/settings" element={<SettingsModal />} />
            </Routes>
        </HashRouter>
    );
}
export default App;
