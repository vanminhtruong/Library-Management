import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import styles from '../../../assets/styles/login.module.scss';

const HandleLogin = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/loginthuvien', {
                user: user,
                password: password
            });
            const { token } = response.data;
            console.log("is: "+JSON.stringify(token))
            localStorage.setItem('token', token);
            // setIsLoggedIn (true);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            alert("Add Success");
            navigate('/');
            window.location.reload();
        } catch (error) {
            console.error('Error logging in:', error);
            // Handle error, such as displaying an error message to the user
            alert("Login failed");
        }
    };

    return (
        <div className={styles.top}>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card bg-transparent text-white">
                        <div className="card-header text-center text-uppercase font-weight-bold">Login</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="user">Username:</label>
                                    <input type="text" className="form-control" id="user" placeholder='User' value={user} onChange={(e) => setUser(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" className="form-control" id="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="d-grid gap-2 mt-4">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <p>Don't have an account? <a href="/singup">Register here</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HandleLogin;
