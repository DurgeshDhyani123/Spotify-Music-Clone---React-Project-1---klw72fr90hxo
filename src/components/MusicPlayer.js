import React, { useEffect, useState, useContext } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import MusicId from '../context/UserContext';

const YourComponent = () => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [currentTrackDetails, setCurrentTrackDetails] = useState({});
    const [collectionTracks, setCollectionTracks] = useState([]);
    const { songId } = useContext(MusicId);

    useEffect(() => {
        fetchCollectionData();
        console.log(songId);
    }, []);

    const fetchCollectionData = async () => {
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/music/album/${''}`, {
                method: 'GET',
                headers: {
                    projectId: 'drbdz4ox1jwn'
                }
            });
            const data = await response.json();
            setCollectionTracks(data.tracks);
        } catch (error) {
            console.error('Error fetching collection data:', error);
        }
    };

    const handleCollectionClick = (collectionId) => {
        fetchCollectionData(collectionId);
        setCurrentTrackIndex(0);
        setCurrentTrackDetails(collectionTracks[0]);
    };

    const handleTrackEnd = () => {
        if (currentTrackIndex < collectionTracks.length - 1) {
            const nextTrackIndex = currentTrackIndex + 1;
            setCurrentTrackIndex(nextTrackIndex);
            setCurrentTrackDetails(collectionTracks[nextTrackIndex]);
        } else {
            // All tracks played, you can stop or handle playback end here
        }
    };

    console.log("songId", songId);

    return (
        <div>
            <AudioPlayer
                className='fixed bottom-0'
                src={songId.prodId}
                autoPlayAfterSrcChange
                onEnded={handleTrackEnd}
                customAdditionalControls={[
                    <img className='rounded-full p-2' key="musicIcon" src={songId.image} alt="Icon" height={60} width={60} />,
                    <p className='font-bold'>{songId.title}</p>,
                ]}
            />
        </div>
    );
};

export default YourComponent;
