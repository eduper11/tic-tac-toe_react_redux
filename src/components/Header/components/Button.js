import React from 'react';

const ButtonGameType = ({ value, name, onClick, gameType }) => {
    return (
        <li
            onClick={() => onClick()}
            className={`header__player-selector--item ${
                value === gameType ? 'active' : ''
            }`}
        >
            {name}
        </li>
    );
};

export default ButtonGameType;
