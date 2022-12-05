import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.css'

const Profile = () => {
    let navigate = useNavigate();

    const {state} = useLocation();
    const { username, email } = state;

    const [usernameUpdate, setUsernameUpdate] = useState();
    const [emailUpdate, setEmailUpdate] = useState();
    const [passwordUpdate, setPasswordUpdate] = useState();

    const handleLikedSongs = async e => {
        e.preventDefault();
        await axios.get('http://localhost:3000/liked-songs', { params: { username: username, email: email } }).then((response) => {
            navigate('/liked-songs', { state: { username: username, email: email } });
        }).catch((response) =>  {
            alert(response.response.data.error);
        })
    }

    const handleDeleteProfile = async e => {
        e.preventDefault();
        await axios.post('http://localhost:3000/delete-profile', { username: username, email: email }).then((response) => {
                alert("You have successfully deleted your profile!");
                navigate('/');
        }).catch((response) => {
            alert(response.response.data.error);
        })
    }

    const handleSignOut = async e => {
        navigate('/');
        await axios.get('http://localhost:3000/sign-out', { params: { username: username, email: email } }).then((response) => {
            navigate('/');
        }).catch((response) =>  {
            alert(response.response.data.error);
        })
    }

    const handleUsernameUpdate = async e => {
        e.preventDefault();
        console.log(usernameUpdate)
        await axios.post('http://localhost:3000/username-update', { username: username, email: email, update: usernameUpdate }).then((response) => {
                alert("You have successfully updated your username!");
                navigate('/profile', { state: { username: usernameUpdate, email: email } });
        }).catch((response) => {
            alert(response.response.data.error);
        })
    }

    const handleEmailUpdate = async e => {
        e.preventDefault();
        await axios.post('http://localhost:3000/email-update', { username: username, email: email, update: emailUpdate }).then((response) => {
                alert("You have successfully updated your email!");
                navigate('/profile', { state: { username: username, email: emailUpdate } });
        }).catch((response) => {
            alert(response.response.data.error);
        })
    }

    const handlePasswordUpdate = async e => {
        e.preventDefault();
        await axios.post('http://localhost:3000/password-update', { username: username, email: email, update: passwordUpdate }).then((response) => {
                alert("You have successfully updated your password!");
                navigate('/profile', { state: { username: username, email: email } });
        }).catch((response) => {
            alert(response.response.data.error);
        })
    }

    return (
        <div>
            <img src='/logo.png' alt="logo"/>
            <div>
                <button onClick={handleLikedSongs}>View Liked Songs</button>
                <button onClick={handleDeleteProfile}>Delete Profile</button>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>
            <div>
                <table className={styles.profile}>
                    <tr>
                        <th>CREDENTIALS</th>
                    </tr>
                    <tr>
                        <th>Username</th>
                        <th>{username}</th>
                        <th>
                            <input type="text" onChange={e => setUsernameUpdate(e.target.value)} />
                            <button onClick={handleUsernameUpdate}>Update Username</button>
                        </th>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <th>{email}</th>
                        <th>
                            <input type="text" onChange={e => setEmailUpdate(e.target.value)} />
                            <button onClick={handleEmailUpdate}>Update Email</button>
                        </th>
                    </tr>
                    <tr>
                        <th>Password</th>
                        <th>********</th>
                        <th>
                            <input type="text" onChange={e => setPasswordUpdate(e.target.value)} />
                            <button onClick={handlePasswordUpdate}>Update Password</button>
                        </th>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Profile;