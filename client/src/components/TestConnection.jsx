import React, { useEffect, useState } from 'react';
import api from '../services/api';

function TestConnection() {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        api.get('/test')
            .then(response => {
                setMessage(response.data.message);
            })
            .catch(err => {
                setError('Error connecting to API: ' + err.message);
            });
    }, []);

    return (
        <div>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default TestConnection;
