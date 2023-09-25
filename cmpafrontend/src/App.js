import { Routes, Route } from "react-router-dom";
import { Verify } from "./Verify";
import  Home  from "./Home";
import "./Style.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      { <Route path="/Verify" element={<Verify />} /> }
    </Routes>
  );
}