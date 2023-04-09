const Initial_state={
    bills:{},
    totalAmount:0,
    categoryWiseAmount:{}
}

export default function Bills(state=Initial_state,action){
    switch (action.type) {
        case "GET_BILLS":
            return{...state,bills:{...state.bills,...action.bills},totalAmount:action.totalAmount,categoryWiseAmount:{...state.categoryWiseAmount,...action.categoryWiseAmount}}
        default: 
            return state
    }
}
 