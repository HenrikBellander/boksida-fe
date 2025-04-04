import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Hämta alla användare från backend
        axios.get('http://localhost:5000/users')
        .then(response => {
            const usersData = response.data[0]; // Första elementet är användarlistan
            const sortedUsers = usersData ? usersData.sort((a, b) => a.id - b.id) : [];
            setUsers(sortedUsers); // Sortera användarna på id i stigande ordning
        })
        .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleDelete = (id) => {
        // Skicka DELETE-anrop för att ta bort användaren
        axios.delete(`http://localhost:5000/users/user/${id}`)
        .then(() => {
            // Om borttagningen lyckas, ta bort användaren från state
            setUsers(users.filter(user => user.id !== id));
        })
        .catch(error => {
            console.error('Error deleting user:', error);
        });
    };

    return (
        <div>
        <h2>Användarlista</h2>
        <table>
            <thead>
            <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {users.map(user => (
                <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>
                    {/* Rött kryss för att ta bort användaren */}
                    <button className='delete-button'
                    style={{
                        color: 'red',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        padding: '0',
                        margin: '0',
                    }}
                    onClick={() => handleDelete(user.id)}
                    >
                    ❌
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default UsersTable;
