import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetGame } from '../../actions/humanAction';
// import ButtonGameType from './components/Button';

const Header = () => {
    const dispatch = useDispatch();
    const board = useSelector((state) => state.boardState);
    const playerTurn = useSelector((state) => state.playerTurn);
    // const changeGType = (gameType) => dispatch(changeGameType(gameType));

    return (
        <header className='header'>
            <h1 className='header__title'>Tic Tac Toe</h1>
            {/* <ul className='header__player-selector'>
                <ButtonGameType
                    value={GAME_TYPES.TWO_PLAYERS}
                    name='2 Players'
                    onClick={() => changeGType(GAME_TYPES.TWO_PLAYERS)}
                    gameType={gameType}
                />
                <ButtonGameType
                    value={GAME_TYPES.VS_CPU}
                    name='Versus Computer'
                    onClick={() => changeGType(GAME_TYPES.VS_CPU)}
                    gameType={gameType}
                />
            </ul> */}
            <div className='header__container--new-game'>
                <button
                    className='header__new-game'
                    onClick={() => dispatch(resetGame(board, playerTurn))}
                >
                    New Game
                </button>
            </div>
        </header>
    );
};

export default Header;
