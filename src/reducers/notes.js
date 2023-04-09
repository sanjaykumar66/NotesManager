const Initial_state={
    notes:{},
}

export default function Notes(state=Initial_state,action){
    switch (action.type) {
        
        case "GET_NOTES":
            console.log(action);
            return{...state,notes:{...state.notes,...action.notes}}
        default: 
            return state
    }
}