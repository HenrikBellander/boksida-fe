import React from 'react';



const Register = () => {



    return (
        <div className="register-form">
            <form onSubmit={handleRegister}>
                <label for='username'>Username: </label>
                <input type='text' name='username'/> <br/>
                <label for='password'>Password: </label>
                <input type='password' /><br/>
                <label for='email'>Email: </label>
                <input type='text' name='email'/><br/>
                <button type='submit'>Register</button>
            </form>
        </div>
    );
};

export default Register;
