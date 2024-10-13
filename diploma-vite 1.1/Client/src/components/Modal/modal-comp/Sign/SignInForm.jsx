import { useState } from "react";
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
    width: '100%',
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

export default function SignInForm(){
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="sign-in-form" style={formStyle}>
            <form>
                <input type="email"
                    placeholder="Email"
                    style={inputStyle}
                    required />
                <input type="password" 
                    placeholder="Password" 
                    style={inputStyle}
                    required />
                <button type="submit"
                    style={isHovered ? {...buttonStyle, ...buttonHoverStyle} : buttonStyle}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                        Sign In
                </button>
            </form>
        </div>
    );
}