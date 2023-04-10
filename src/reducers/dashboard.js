const Initial_state={
    tabName:'Bills'
}

export default function Dashboard(state=Initial_state,action){
    switch (action.type) {
        case "GET_TABNAME":
            return{...state,tabName:action.tabName}
        default: 
            return state
    }
}
 