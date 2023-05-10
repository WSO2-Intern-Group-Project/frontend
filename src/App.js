import logo from "./logo.svg";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignIn from "./pages/SignIn";
import HomePage from "./pages/HomePage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/signin" element={<SignIn />} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
