import React from 'react';

function LoginPage() {
    return (
        <div>
            <h1>Logga in</h1>
            <form>
                <div>
                    <label>Användarnamn:</label>
                    <input type="text" />
                </div>
                <div>
                    <label>Lösenord:</label>
                    <input type="password" />
                </div>
                <button type="submit">Logga in</button>
            </form>
        </div>
    );
}

export default LoginPage;