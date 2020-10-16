import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateGameState, initGame } from '../../../../actions/humanAction';
import { PLAYER_TURNS } from '../../../../utils/types';
import Cell from '../Cell/Cell';

const Board = () => {
    const dispatch = useDispatch();

    const position = useSelector((state) => state.gameState.position);
    const board = useSelector((state) => state.boardState);
    const playerTurn = useSelector((state) => state.playerTurn);

    dispatch(updateGameState(board));

    useEffect(() => {
        if (playerTurn === PLAYER_TURNS.CPU) {
            dispatch(initGame(board));
        }
    }, []);

    return (
        <div className={`board ${position} ${position !== '' ? 'full' : ''}`}>
            <div className='board-row'>
                <Cell index={0} />
                <Cell index={1} />
                <Cell index={2} />
            </div>

            <div className='board-row'>
                <Cell index={3} />
                <Cell index={4} />
                <Cell index={5} />
            </div>

            <div className='board-row'>
                <Cell index={6} />
                <Cell index={7} />
                <Cell index={8} />
            </div>
        </div>
    );
};

export default Board;
