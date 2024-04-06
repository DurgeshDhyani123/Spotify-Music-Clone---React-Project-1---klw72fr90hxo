import React, { useState, useEffect, useContext } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MusicId from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import Footer from './Footer';

const MusicList = ({ searchInput }) => {
  const [musicData, setMusicData] = useState([]);
  const { setSongId } = useContext(MusicId);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMusic();
  }, []);

  const setProductId = (id, image, title) => {
    setSongId({ prodId: id, image, title });
    navigate('/library');
  };

  const fetchMusic = async () => {
    try {
      const response = await fetch('https://academics.newtonschool.co/api/v1/music/song', {
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

  const filteredMusic = musicData.filter((song) =>
    song.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6
  };

  return (
    <div className='pb-40'>
      <div className='text-3xl font-bold m-6'>
        {filteredMusic.length > 0 ? (
          <h1 className='pl-24 pr-32'>Trending Music on SoundCloud</h1>
        ) : (
          <p className='pl-24 pr-32'>No data found.....</p>
        )}
      </div>
      <div className='pl-28 pr-28 '>
        {musicData.length > 0 ? (
          <Slider {...settings}>
            {filteredMusic.map((song) => (
              <div key={song._id} onClick={() => setProductId(song.audio_url, song.thumbnail, song.title)}>
                <img
                  src={song.thumbnail}
                  alt={song.title}
                  height={200}
                  width={200}
                  className='cursor-pointer'
                />
                <div className='ml-4 w-48 break-words '>
                  <div className='flex justify-around'>
                    <h2>{song.title}</h2>
                    <p className='p-1'>
                      <AiOutlineHeart className='text-black-500' />
                    </p>
                  </div>
                  <p className='text-gray-500'>{song.artist[0].name}</p>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p>Loading.....</p>
        )}
        <div className='p-6' >
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MusicList;
