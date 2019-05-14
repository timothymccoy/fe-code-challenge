import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import spot from 'spot/spot-reducer';
import {reducer as formReducer} from 'redux-form';

export default history => combineReducers({
    spot,
    form: formReducer,
    router: connectRouter(history),
});
