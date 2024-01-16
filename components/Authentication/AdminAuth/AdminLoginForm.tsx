import React, { useState } from 'react';
import '../UserAuth/styles.css';
import '../../BookingForm/BookingForm.css'
import BorderContainer from '../../Containers/BorderContainer';

interface AdminLoginFormProps {
    onAdminLogin: (username: string, password: string) => void;
}

const LoginForm: React.FC<AdminLoginFormProps> = ({ onAdminLogin }) => {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdminLogin(formData.username, formData.password);
    };

    return (
        <>
            <h2>Admin Panel</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Admin Login</button>
            </form>
        </>

    );
};

function LogAdminLogin(username: string, password: string) {
    console.log("username: " + username + " password: " + password);
}

function AdminLoginForm() {
    return (
        <BorderContainer>
            <LoginForm onAdminLogin={LogAdminLogin} />
        </BorderContainer>
    )
}

export default AdminLoginForm;
