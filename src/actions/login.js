import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword   } from "firebase/auth";

export function signIn(email,password){
    return dispatch=>{
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            dispatch({type:"GET_UID",user:userCredential.uid,LoginError:false})
        }).catch(err=>{
            console.log(err)
            dispatch({type:"GET_UID",user:false,LoginError:err.message})
        })
       
    }
}

export function updateAuth(user,error){
    return dispatch=>{
        dispatch({type:"UPDATE_AUTH",user:user,LoginError:error})
    }
}