import {
    HUMAN_ACTION,
    CHANGE_GAME_TYPE,
    RESET_GAME,
    CPU_ACTION,
    GAME_UPDATE,
    REVERT_MOVE,
    SET_ID,
    SET_BOARD_STATE,
} from '../types';
import {
    // GAME_TYPES,
    PLAYER_TURNS,
} from '../utils/types';
import { getRandom } from '../utils/helpers';

const initialState = {
    matchId: '',
    boardState: [
        '-',
        '-',
        '-', // first row, positions 0, 1, 2
        '-',
        '-',
        '-', // second row, positions 3, 4, 5
        '-',
        '-',
        '-',
    ],
    lastMove: {
        char: null, // char one of [1, 0], required
        position: '', // number from 0 to 8, required
        board: [
            '-',
            '-',
            '-', // first row, positions 0, 1, 2
            '-',
            '-',
            '-', // second row, positions 3, 4, 5
            '-',
            '-',
            '-',
        ],
    },
    currentIcon: getRandom(0, 2),
    playerTurn: getRandom(0, 2),
    gameState: {
        position: '',
        icon: null,
        isTie: null,
    },
};

export default function (state = initialState, action) {
    console.log('state', state, 'type', action.type);

    switch (action.type) {
        case SET_ID:
            return {
                ...state,
                matchId: action.payload,
            };

        case SET_BOARD_STATE:
            return {
                ...state,
                lastMove: {
                    char: action.payload.estado.currentIcon,
                    board: action.payload.estado.boardState,
                    position: action.payload.index,
                },
            };
        case HUMAN_ACTION:
            const lastBoard = state.lastMove.board;
            return {
                ...state,
                ...(state.boardState[action.payload] = state.currentIcon),
                lastMove: {
                    ...state.lastMove,
                    board: lastBoard,
                },
                currentIcon: state.currentIcon === 0 ? 1 : 0,
                playerTurn: PLAYER_TURNS.CPU,
            };

        case CHANGE_GAME_TYPE:
            return {
                ...state,
                gameType: action.payload,
            };
        case RESET_GAME:
            return {
                matchId: '',
                boardState: [
                    '-',
                    '-',
                    '-', // first row, positions 0, 1, 2
                    '-',
                    '-',
                    '-', // second row, positions 3, 4, 5
                    '-',
                    '-',
                    '-',
                ],
                lastMove: {
                    char: null, // char one of ['o','x'], required
                    position: '', // number from 0 to 8, required
                    board: [
                        '-',
                        '-',
                        '-', // first row, positions 0, 1, 2
                        '-',
                        '-',
                        '-', // second row, positions 3, 4, 5
                        '-',
                        '-',
                        '-',
                    ],
                },
                currentIcon: getRandom(0, 2),
                playerTurn: getRandom(0, 2),
                gameState: {
                    position: '',
                    icon: null,
                    isTie: null,
                },
            };
        case CPU_ACTION:
            // const lastBoardCPU = state.lastMove.board;
            return {
                ...state,
                ...(state.boardState[action.payload] = state.currentIcon),
                // ...(lastBoardCPU[action.payload] = state.currentIcon),
                lastMove: {
                    ...state.lastMove,
                    board: state.boardState,
                },
                currentIcon: state.currentIcon === 0 ? 1 : 0,
                playerTurn: PLAYER_TURNS.HUMAN,
            };
        case GAME_UPDATE:
            return {
                ...state,
                gameState: {
                    position: action.payload.position,
                    icon: action.payload.iconType,
                    isTie: action.payload.isTie,
                },
            };
        case REVERT_MOVE: {
            return {
                ...state,
                boardState: state.lastMove.board,
                currentIcon: state.lastMove.char,
                playerTurn: PLAYER_TURNS.HUMAN,
            };
        }
        default:
            return state;
    }
}
