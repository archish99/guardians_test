import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
