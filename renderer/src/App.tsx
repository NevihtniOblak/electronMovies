import { HashRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import SettingsModal from "./components/SettingsModal/SettingsModal";

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
