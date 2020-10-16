import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { humanClick } from '../../../../actions/humanAction';
import { ICON_CHARS, PLAYER_TURNS } from '../../../../utils/types';

const ICON_PLACEHOLDER = 'I';

const Cell = ({ index }) => {
    const value = useSelector((state) => state.boardState[index]);
    const icon = value !== '-' ? ICON_CHARS[value] : ICON_PLACEHOLDER;
    const isDoneClass = icon !== ICON_PLACEHOLDER ? 'done' : '';
    const playerTurn = useSelector((state) => state.playerTurn);
    const position = useSelector((state) => state.gameState.position);

    const dispatch = useDispatch();

    const humanPlay = (index) => dispatch(humanClick(index));

    return (
        <button
            className={`cell cell-${index} ${isDoneClass}`}
            onClick={
                value === '-' &&
                playerTurn === PLAYER_TURNS.HUMAN &&
                position === ''
                    ? () => humanPlay(index)
                    : () => {}
            }
        >
            {icon}
        </button>
    );
};

export default Cell;
