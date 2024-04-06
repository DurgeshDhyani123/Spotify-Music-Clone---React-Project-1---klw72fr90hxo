import React, { useState } from "react";
import MusicList from "./MusicList";
import Album from "./Album";
import MusicPlayer from "./MusicPlayer";
import Navbar from "./Navbar";
import LikedSongs from "./LikedSongs";



const Home = () => {

    const [searchInput, setSearchInput] = useState('');


    return (
        <>
            <Navbar searchInput={searchInput} setSearchInput={setSearchInput} />

            <Album searchInput={searchInput} />
            <MusicList searchInput={searchInput} />
            <MusicPlayer />
            {/* / <LikedSongs /> */}
        </>
    );
};

export default Home;