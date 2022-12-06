import React, {useState}  from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css'

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    let navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        await axios.get('http://localhost:3000/login', { params: { email: email, password: password } }).then((response) => {
            navigate('/profile', { state: { username: response.data.username, email: response.data.email } });
        }).catch((response) =>  {
            alert(response.response.data.error);
        })
      }

    return (
        <div>
            <img src="logo.png" alt="logo"/>
            <h1>TuneIn</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>EMAIL</p>
                    <input type="text" onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    <p>PASSWORD</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">SUBMIT</button>
                    <button onClick={() => navigate("/sign-up")}>SIGN UP</button>
                </div>
            </form>
        </div>
    )
  }

  export default Login;

  
