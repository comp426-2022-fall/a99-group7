import React, {useState}  from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';


const Login = () => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    let navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        await axios.get('http://localhost:3000/login', { params: { username: username, password: password } }).then((response) => {
            console.log(response)
            navigate({
                pathname: '/profile',
                search: username,
            });
        }).catch(response =>  
            console.log(response.response.data.error)
        )
      }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>

            <button onClick={() => navigate("/sign-up")}>Sign Up</button>
        </div>
    )
  }

  export default Login;

  
