import React, { useEffect, useState } from 'react';

const LikedSongs = () => {
    const [likedSongs, setLikedSongs] = useState([]);

    useEffect(() => {
        // Fetch liked songs on component mount
        fetch('https://academics.newtonschool.co/api/v1/music/favorites/like', {
            method: 'GET',
            headers: {
                Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OGQyMDJiOWExMzA0NDdiYTY0OGJjOSIsImlhdCI6MTcwMzkyNDE1MiwiZXhwIjoxNzM1NDYwMTUyfQ.aXOp9w2poL9JaWcpkuevv9kUFS-Xh3TZP8-idWDy3Yc',
                projectID: 'drbdz4ox1jwn'
            }
        })
            .then(response => response.json())
            .then(data => {

                setLikedSongs(data);
                console.log("favsong", data)
            })
            .catch(error => {
                console.error('Error fetching liked songs:', error);
            });
    }, []);

    const handleFavorite = (songId) => {
        const isSongLiked = likedSongs.some(song => song.id === songId);

        fetch('https://academics.newtonschool.co/api/v1/music/favorites/like', {
            method: 'PATCH',
            headers: {
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OGQyMDJiOWExMzA0NDdiYTY0OGJjOSIsImlhdCI6MTcwMzkyNDE1MiwiZXhwIjoxNzM1NDYwMTUyfQ.aXOp9w2poL9JaWcpkuevv9kUFS-Xh3TZP8-idWDy3Yc',
                'Content-Type': 'application/json',
                projectID: 'drbdz4ox1jwn'
            },
            body: JSON.stringify({ songId: songId })
        })
            .then(response => response.json())
            .then(data => {
                if (isSongLiked) {
                    setLikedSongs(likedSongs.filter(song => song.id !== songId));
                } else {
                    setLikedSongs([...likedSongs, data]);
                }
            })
            .catch(error => {
                console.error('Error updating favorite:', error);
            });
    };

    return (
        <div>
            <h2>Liked Songs</h2>
            <ul>
                {Array.isArray(likedSongs) && likedSongs.map((song) => (
                    <li key={song.id}>
                        {song.title}
                        <button onClick={() => handleFavorite(song.id)}>
                            {likedSongs.some(s => s.id === song.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LikedSongs;
