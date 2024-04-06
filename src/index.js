import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Library from "./pages/library";
import Feed from './pages/feed';
import Navbar from "./components/Navbar";
import MusicPlayer from "./components/MusicPlayer";
import UserContextProvider from "./context/UserContextProvider";
import Home from "./components/Home";
import Upload from "./pages/upload";
import LikedSongs from "./components/LikedSongs";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/library" element={<Library />} />
        <Route path="/music" element={<MusicPlayer />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/liked-songs" element={<LikedSongs />} />

      </Routes>
    </BrowserRouter >
  );
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContextProvider>
    <App />
  </UserContextProvider>
);
