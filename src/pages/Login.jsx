import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Changed from navigate to useNavigate
import { useAuth } from "../context/AuthContext";
import { loginUser } from '../services/authApi';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate(); // Proper hook usage

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        console.log("Login attempted with:", { username, password });
        
        try {
            console.log("Attempting login API call");
            const response = await loginUser({ username, password });
            await login(response.user);
            console.log("Login response:", response);
            /*login(response.user); // Update context */

            console.log("Login successful:", response.user);
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;





/* old Login
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import FavoriteButton from '../components/FavoriteButton'
import { login } from '../services/authApi'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [serverMessage, setServerMessage] = useState('')
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            const response = await login(data)
            setServerMessage({ type: 'success', text: response.message })
            navMainMenu()
        } catch (error) {
            setServerMessage({
                type: "error",
                text: error.response?.data?.error || "Something went wrong!",
            })
        }
    }

    const navMainMenu = () => {
        navigate("/");
    };

    return (
        <div>
            <h2>Login</h2>
            {serverMessage && (
                <p>{serverMessage.text}</p>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                    name="username"
                    label="Username"
                    register={register}
                    registerOptions={{ required: "Username is required" }}
                    error={errors.username}
                />
                <TextInput
                    type='password'
                    name="password"
                    label="Password"
                    register={register}
                    registerOptions={{ required: "Password is required" }}
                    error={errors.password}
                />
                <Button type="submit">Login</Button>
            </form>
            <LinkButton to='/'>Categories</LinkButton>
        </div>
    )
}

export default Login*/