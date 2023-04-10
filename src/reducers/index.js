import { combineReducers } from 'redux'
import Login from './login';
import Bills from './bills';
import Notes from './notes';
import Dashboard from './dashboard';

const rootReducer = combineReducers({
    Login:Login,
    Bills:Bills,
    Notes:Notes,
    Dashboard:Dashboard
});
  
export default rootReducer;