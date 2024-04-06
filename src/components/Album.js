import React, { useState, useEffect, useContext } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MusicId from '../context/UserContext';
import { useNavigate } from 'react-router-dom';


const Album = ({ searchInput }) => {
    const [musicData, setMusicData] = useState([]);
    const { setSongId } = useContext(MusicId);
    const navigate = useNavigate();
    useEffect(() => {
        fetchMusic();
    }, []);

    const setProductId = async (id) => {
        // navigate('/music');
    }

    const fetchMusic = async () => {
        try {
            const response = await fetch('https://academics.newtonschool.co/api/v1/music/album?limit=100 ', {
                headers: {
                    projectId: 'drbdz4ox1jwn'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch music data');
            }
            const result = await response.json();
            setMusicData(result.data);
        } catch (error) {
            console.error('Error fetching music:', error.message);
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6
    };



    const filteredMusicData = musicData.filter((song) =>
        song.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <div>
            <div className='text-3xl font-bold m-6'>
                {filteredMusicData.length > 0 ? (
                    <h1 className='pl-24 pr-32'>List of Albums</h1>
                ) : (
                    <p className='pl-24 pr-32'>No data found.....</p>
                )}
            </div>
            <div className='pl-28 pr-28 pb-16'>
                {musicData.length > 0 ? (
                    <Slider {...settings}>
                        {filteredMusicData.map((song) => (
                            <div key={song._id}>
                                <img
                                    src={song.image}
                                    alt={song.title}
                                    height={200}
                                    width={200}
                                    className='cursor-pointer'
                                    onClick={() => setProductId(song.audio_url)}
                                />
                                <div className='ml-4 w-48 break-words'>
                                    <h2>{song.title}</h2>
                                    <p className='text-gray-500'>{song.artists[0].name}</p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Album;