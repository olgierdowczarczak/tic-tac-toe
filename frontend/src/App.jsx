import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import RoomsPage from "./pages/RoomsPage";
import GamePage from "./pages/GamePage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/rooms" element={<RoomsPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/rooms/:gameId" element={<GamePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
