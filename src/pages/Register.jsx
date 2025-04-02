import React, { useState } from 'react';


const Register = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });
  
    const [responseMessage, setResponseMessage] = useState('');


    const [responseMessage, setResponseMessage] = useState('');


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setResponseMessage('');

    
        // Skicka data till backend via API
        try {
            
            const response = await fetch('http://localhost:5000/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Data sent successfully:', data);

                if (typeof(data) === 'number') {
                    setResponseMessage('User created successfully');
                    setFormData({ username: '', password: '', email: '' });
                } else {
                    setResponseMessage('Username already exists');
                }
            } else {
                
                console.error('Error sending data:', response);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="register-form">
            <form onSubmit={handleRegister} method='POST'>
                <label htmlFor='username'>Username: </label>
                <input type='text' name='username' value={formData.username} onChange={handleChange}/> <br/>
                <label htmlFor='password'>Password: </label>
                <input type='password' name='password' value={formData.password} onChange={handleChange}/><br/>
                <label htmlFor='email'>Email: </label>
                <input type='text' name='email' value={formData.email} onChange={handleChange}/><br/>
                <button type='submit'>Register</button>
            </form>

            {responseMessage && (
                <div>
                    {responseMessage}
                </div>
            )}
        </div>
    );
};


export default Register;
