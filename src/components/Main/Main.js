import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PLAYER_TURNS } from '../../utils/types';
// import { revertMove } from '../../actions/humanAction';
import Board from './components/Board/Board';

const Main = () => {
    // const dispatch = useDispatch();

    let textInfo = '';

    const isTie = useSelector((state) => state.gameState.isTie);
    const position = useSelector((state) => state.gameState.position);
    const playerTurn = useSelector((state) => state.playerTurn);
    // const lastMove = useSelector((state) => state.lastMove);

    if (isTie) {
        textInfo = 'Tie!';
    } else {
        if (position !== '' && playerTurn === PLAYER_TURNS.CPU) {
            textInfo = 'You win!';
        } else if (position !== '' && playerTurn === PLAYER_TURNS.HUMAN) {
            textInfo = 'CPU win!';
        } else if (playerTurn === PLAYER_TURNS.CPU) {
            textInfo = `It's CPU`;
        } else {
            textInfo = 'It´s your turn';
        }
    }
    return (
        <main className='main'>
            <div className='info'>{textInfo}</div>
            <Board />
            <div className='game-info'>
                {/* {lastMove.position !== '' &&
                playerTurn === PLAYER_TURNS.HUMAN ? (
                    <p className='game-info__text'>
                        If you want to revert your last move...
                        <button
                            type='button'
                            className='game-info__button'
                            onClick={() => {
                                dispatch(revertMove());
                            }}
                        >
                            Click here
                        </button>
                    </p>
                ) : (
                    ''
                )} */}
            </div>
        </main>
    );
};

export default Main;
