const Initial_state={
    user:false,
    LoginError:false
 }
 
 export default function Login(state=Initial_state,action){
     switch (action.type) {
        case "GET_UID":
            return{...state,user:action.user,LoginError:action.LoginError}
        case "UPDATE_AUTH":
            return{...state,user:action.user,LoginError:action.LoginError}
        default: 
             return state
     }
 }