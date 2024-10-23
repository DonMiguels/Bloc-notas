import React, { useState } from 'react';
import '../styles/Toggle.css'; 

const Toggle = ({ onToggle }) => {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(prevState => !prevState);
        onToggle(!isToggled);
    };

    return (
        <label className="label">
            <input
                type="checkbox"
                className="toggle-state"
                checked={isToggled}
                onChange={handleToggle}
            />
            <div className="toggle">
                <div className="indicator"></div>
            </div>
            <span className="label-text">
                {isToggled ? 'Galería' : 'Lista'}
            </span>
        </label>
    );
};

export default Toggle;
