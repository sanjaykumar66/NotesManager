import { combineReducers } from 'redux'
import Login from './login';
import Bills from './bills';
import Notes from './notes';

const rootReducer = combineReducers({
    Login:Login,
    Bills:Bills,
    Notes:Notes
});
  
export default rootReducer;