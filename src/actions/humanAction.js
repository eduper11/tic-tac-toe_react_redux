import {
    HUMAN_ACTION,
    CHANGE_GAME_TYPE,
    RESET_GAME,
    CPU_ACTION,
    GAME_UPDATE,
    REVERT_MOVE,
    SET_ID,
    SET_BOARD_STATE,
} from '../types/index';
import { checkGameState, makeAIMove, findRandomMove } from '../utils/helpers';
import store from '../store';
import { PLAYER_TURNS } from '../utils/types';
import { v4 as uuidv4 } from 'uuid';

const state = store.getState();
console.log('state', state);

export function humanClick(index) {
    return (dispatch) => {
        //init with unique uuid
        if (state.matchId === '') {
            setId(uuidv4());
        }

        dispatch(setGameState(state, index));
        //send info to cell and update state
        dispatch(humanMove(index));
        //calcular siguiente movimiento de la cpu (si no hay victoria de ningún jugador)
        if (state.gameState.position === '') {
            setTimeout(() => {
                let { boardState, currentIcon } = store.getState();
                const cpuIndex = makeAIMove(boardState, currentIcon);
                dispatch(printCPUMove(cpuIndex));
            }, 1000);
        }
    };
}

const setGameState = (estado, index) => ({
    type: SET_BOARD_STATE,
    payload: { estado, index },
});

const setId = (uuid) => ({
    type: SET_ID,
    payload: uuid,
});

const humanMove = (index) => ({
    type: HUMAN_ACTION,
    payload: index,
});

export function changeGameType(gameType) {
    return (dispatch) => {
        dispatch({ type: CHANGE_GAME_TYPE, payload: gameType });
    };
}

export function resetGame(board) {
    return (dispatch) => {
        //reset of the board
        dispatch({ type: RESET_GAME });

        const { playerTurn } = store.getState();
        //if its cpu turn, cpu play
        if (playerTurn === PLAYER_TURNS.CPU) {
            const index = findRandomMove(board);
            dispatch(printCPUMove(index));
        }
    };
}

const printCPUMove = (idx) => ({ type: CPU_ACTION, payload: idx });

const printUpdateGameState = (gState) => {
    return {
        type: GAME_UPDATE,
        payload: gState,
    };
};

export function updateGameState(board) {
    return (dispatch) => {
        const gameState = checkGameState(board);

        dispatch(printUpdateGameState(gameState));
    };
}

export function initGame(board) {
    const index = findRandomMove(board);

    return (dispatch) => {
        dispatch(printCPUMove(index));
    };
}

export function revertMove() {
    return (dispatch) => {
        dispatch({
            type: REVERT_MOVE,
        });
    };
}
