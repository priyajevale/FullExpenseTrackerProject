import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Layout/Navbar";
import HomePage from "./components/pages/Home";
import Expense from "./components/expense/Expense";
import AuthPage from "./components/Authentication/Auth";
import Profile from "./components/Profile/Profile";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        
        <Route path="/profile" element={<Profile />} />
        <Route path="/exp" element={<Expense />} />
        <Route path="/" element={<AuthPage />} />
      </Routes>
    </>
  );
}

export default App;
