import {SPOT_UPDATE_SELECTED, SPOT_RESET_SELECTED} from './spot-actions';

const initialState = {
    selected: null
};

export default function spot(state = initialState, {type, payload}) {
    switch (type) {
        case SPOT_UPDATE_SELECTED: {
            return {
                ...state,
                selected: payload || null
            };
        }

        case SPOT_RESET_SELECTED:{
            return {
                ...state,
                selected:payload || null
            }
        }

        default:
            return state;
    }
}
