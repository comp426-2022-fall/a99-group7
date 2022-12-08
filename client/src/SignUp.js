import React, {useState}  from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();

    let navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        await axios.post('http://localhost:3000/app/sign-up', { username: username, password: password, email: email }).then((response) => {
                alert("You have successfully registered! Taking you back to the login page!");
                navigate('/');
        }).catch((response) => {
            alert(response.response.data.error);
        })
      }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                    <label>
                        <p>Username</p>
                        <input type="text" onChange={e => setUserName(e.target.value)} />
                    </label>
                    <label>
                        <p>Email</p>
                        <input type="text" onChange={e => setEmail(e.target.value)} />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={e => setPassword(e.target.value)} />
                    </label>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
            </form>
        </div>
    )
}

export default SignUp;