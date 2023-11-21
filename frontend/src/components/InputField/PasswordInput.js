import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const PasswordInput = ({ name, value, onChange, error, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='mt-3'>
      <div className="password-input-container">
        <input
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className='form-control'
          required
        />
        <span
          className="password-toggle-icon"
          onClick={handleTogglePassword}
        >
          {showPassword ? <FiEye /> : <FiEyeOff />}
        </span>
      </div>
      {error && <p className="input_error">{error}</p>}
    </div>
  );
};

export default PasswordInput;
