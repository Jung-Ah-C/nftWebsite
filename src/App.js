import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from './pages/Home.js';
import HomeDetails from './pages/HomeDetails.js';
import Guide from './pages/Guide.js';
import GuideDetails from './pages/GuideDetails.js';


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/:id" element={<HomeDetails/>}/>
        <Route exact path="/guide" element={<Guide/>}/>
        <Route exact path="/guide/:id" element={<GuideDetails/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
