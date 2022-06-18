import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import DashBoard from "./components/DashBoard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<DashBoard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
