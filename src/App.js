import { Routes, Route } from "react-router-dom";
import LoginComp  from './pages/LoginComp';
import DashboardComp from "./pages/DashboardComp";
import { onAuthStateChanged   } from "firebase/auth";
import {auth} from './firebaseConfig';
// import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {updateAuth} from './actions/login'
import { useNavigate } from "react-router-dom";


function App() {

  // const user_det = useSelector(state=>state.user);
  // const LoginError = useSelector(state=>state.LoginError);
  const dispatch = useDispatch();
  const navigate  = useNavigate();

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      dispatch(updateAuth(user.uid,false));
      navigate('/dashboard');
    }
    else{
      dispatch(updateAuth(false,false));
      navigate('/');
    }
  })

  return (
      <div className="app">
        <Routes>
          <Route path="/" element={<LoginComp />} />
          <Route path="/dashboard" element={<DashboardComp/>}/>
        </Routes>
      </div>
  );
}

export default App;
