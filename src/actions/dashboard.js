export function ChangeTab(tab){
    return dispatch =>{
        dispatch({type:"GET_TABNAME",tabName:tab})
    }
}