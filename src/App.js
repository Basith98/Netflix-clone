import { Route, Routes } from "react-router-dom";
import NavBar from "./component/NavBar";
import "./index.css";
import Home from "./component/pages/HomePage/Home";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
