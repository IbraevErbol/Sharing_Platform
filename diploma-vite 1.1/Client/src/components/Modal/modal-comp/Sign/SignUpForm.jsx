import { useState } from "react";
import { useNavigate } from "react-router-dom";

const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    boxSizing: 'border-box',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px'
};

const buttonStyle = {
    backgroundColor: '#ffffff', 
    color: '#007BFF',
    padding: '10px 20px',
    margin: '10px 0',
    border: '1px solid #007BFF',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s, color 0.3s',
};

const buttonHoverStyle = {
    backgroundColor: '#007BFF', 
    color: '#ffffff',
};

const formStyle = {
    width: '300px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column'
};

export default function SignUpForm({}) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigation = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!emailRegex.test(email)){
            setPasswordError("Please enter a valid email address");
            return;
        }
        const usernamePattern = /^[a-zA-Z\s]+$/;
        if(!usernamePattern.test(username)){
            setPasswordError("Username must be in English letters only")
            return;
        }
        if(password !== confirmPassword){
            setPasswordError("Passwords do not match!");
            return;
        }
        if (password.length < 6) {
            setPasswordError("Password should be at least 6 characters long");
            return;
        }
        setPasswordError('');
        
        const userData = {
            username,
            email,
            password,
        };


        try{
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
            if(!response.ok){
                const error = await response.json();
                throw new Error(error.error);
            }
            const data = await response.json();
            // Проверка данных
            // console.log(data);
            setErrorMessage('');

            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');

            // Перенаправление на профиль
            navigation(`/profile/${data._id}`)
        }
        catch(error){
            console.error('Error: ', error);
            setErrorMessage(error.message);
        }
    }

    return (
        <div className="sign-up-form">
            <form onSubmit={handleSubmit} style={formStyle}>
                <input 
                    type="text"
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    style={inputStyle}
                    required
                />
                <input 
                    type="email"
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                    required
                />
                <input 
                    type="password"
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                    required
                />
                <input 
                    type="password"
                    placeholder="Confirm Password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={inputStyle}
                    required
                />
                {passwordError && (
                    <p style={{ color: 'red', fontSize: '14px' }}>{passwordError}</p>
                )}
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                <button type="submit" style={isHovered ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                        Sign Up
                </button>
            </form>
        </div>
    );
}