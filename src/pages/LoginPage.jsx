import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { signIn } = UserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signIn("user@app.com", password)
            navigate('/')
        } catch (e) {
            setError(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-3xl p-4">
            <div className='flex flex-col space-y-4'>
                <label className='font-medium'>Wachtwoord</label>
                <input onChange={(e) => setPassword(e.target.value)} className='rounded-3xl p-2 bg-gray-700 bg-opacity-80 text-white' type='password' />
                <p className="text-red-100">{error.message}</p>
            </div>
        </form>
    );
}

export default LoginPage;