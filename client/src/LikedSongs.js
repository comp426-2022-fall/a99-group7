import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

// LikedSongs component used to display liked songs of user and provides functionality to add songs to liked songs or delete liked songs
const LikedSongs = () => {
    let navigate = useNavigate();

    const {state} = useLocation();
    const { username, email } = state;

    const [URL, setURL] = useState();
    const [songs, setSongs] = useState([]);
    const [songsLoaded, setSongsLoaded] = useState(false);

    // When page initially loads, website retrieves all the user's liked songs    
    useEffect(() => {
        (async () => {
            await axios.get('http://localhost:3000/app/get-liked-songs/', { params: { email: email } }).then((response) => {
                setSongs(response.data);
                setSongsLoaded(true);
            }).catch((response) =>  {
                alert("ERROR");
            })
        })();
    }, []);

    // Navigates to profile page
    const handleProfilePage = async e => {
        e.preventDefault();
        await axios.get('http://localhost:3000/app/profile-page/', { params: { username: username, email: email } }).then((response) => {
            navigate('/profile', { state: { username: username, email: email } });
        }).catch((response) =>  {
            alert(response.response.data.error);
        })
    }

    // Adds new song to list of user's liked songs
    const addSong = async e => {
        e.preventDefault();
        await axios.post('http://localhost:3000/app/add-song/', { email: email, URL: URL }).then((response) => {
            window.location.reload(true);
        }).catch((response) => {
            alert(response.response.data.error);
        })
    }

    // Deletes song from user's list of liked songs
    const deleteSong = async e => {
        await axios.post('http://localhost:3000/app/delete-song/', { email: email, URL: e.target.getAttribute('url').toString() }).then((response) => {
            window.location.reload(true);
        }).catch((response) => {
            alert(response.response.data.error);
        })
    }

    // Displays all of user's liked songs in a table format
    const displaySongs = () => {
        if (songsLoaded == true) {
            return (songs.data.map((listValue, index) => {
                return (
                    <tr key={index}>
                        <td>{listValue.song}</td>
                        <td>{listValue.artist}</td>
                        <td>{listValue.album}</td>
                        <td><a href={listValue.url}>{listValue.url}</a></td>
                        <td><button onClick={deleteSong} url={listValue.url} >Delete</button></td>
                    </tr>
                )
            }))
        }
    }

    return (
        <div>
            <img src={require("./logo.png")} width="250px" height="200px" alt="logo"/>
            <div>
                <div>
                    <button onClick={handleProfilePage}>View Profile</button>
                </div>
                <div>
                    <input type="text" onChange={e => setURL(e.target.value)} />
                    <button onClick={addSong}>Add Song!</button>
                </div>
            </div>
            <div>
                <table>
                    <tr>
                        <td style = {{fontWeight: "bold", fontSize: 30}}>SONG</td>
                        <td style = {{fontWeight: "bold", fontSize: 30}}>ARTIST</td>
                        <td style = {{fontWeight: "bold", fontSize: 30}}>ALBUM</td>
                        <td style = {{fontWeight: "bold", fontSize: 30}}>SPOTIFY URL</td>
                    </tr>
                    {displaySongs(songs)}
                </table>
            </div>
        </div>
    )
}

export default LikedSongs;