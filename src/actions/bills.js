import {db,storage,StorageRef} from '../firebaseConfig';
import {collection, addDoc ,serverTimestamp, orderBy, getDocs} from "firebase/firestore";
import { uploadBytes } from "firebase/storage";
import store from '../store';

export function Addbills({user, billName, selected, totalAmount, file,callBackFunction}){
    return dispatch=>{
            var Path = user+'/'+new Date().getTime()+'_'+file.name;
            const storage_1 = StorageRef(storage, Path);
            uploadBytes(storage_1, file).then((snapshot) => {
                console.log('Uploaded a blob or file!');
                var data = {
                    name:billName,
                    file:"https://firebasestorage.googleapis.com/v0/b/mywork-1f85e.appspot.com/o/" + encodeURIComponent(Path) + "?alt=media",
                    timestamp:serverTimestamp(),
                    category:selected.name,
                    amount:parseInt(totalAmount)
                }
                addDoc(collection(db,"users",user,"Bills"),data).then((key)=>{
                        var categoryWiseAmount = {...store.getState().Bills.categoryWiseAmount};
                        if(categoryWiseAmount[selected.name]){
                            categoryWiseAmount[selected.name] += parseInt(totalAmount);
                        }
                        else{
                            categoryWiseAmount[selected.name] = parseInt(totalAmount);
                        }
                        var temp = {};
                        var time = new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getFullYear();
                        data.timestamp = time;
                        temp[key.id] = data;
                        var totalAmount_temp = store.getState().Bills.totalAmount + parseInt(totalAmount);
                        dispatch({type:"GET_BILLS", bills:temp,categoryWiseAmount:categoryWiseAmount,totalAmount:totalAmount_temp});
                        if(callBackFunction){
                            callBackFunction();
                        }
                })  
            });
    }
}

export function getBills(uid){
    return async dispatch => {
        
        if(uid){
            var CategoryWiseAmount = {
                'Telephone Bills':0,
                'Books Periodicals Bills':0,
                'Vehicle Menteinance Bills':0,
                'LTA Bills':0,
                'Uniform Bills':0
            }
            var totalAmount = 0;
            try {
                const querySnapshot = await getDocs(collection(db, 'users', uid, 'Bills'), orderBy('timestamp', 'desc'));
                const Object = {};
                querySnapshot.forEach(doc => {
                    Object[doc.id] = doc.data();
                    if(CategoryWiseAmount[Object[doc.id].category])
                        CategoryWiseAmount[Object[doc.id].category] += Object[doc.id].amount;
                    else
                        CategoryWiseAmount[Object[doc.id].category] = Object[doc.id].amount; 

                    totalAmount += Object[doc.id].amount;

                    var time = Object[doc.id].timestamp.toDate().getDate()+'/'+Object[doc.id].timestamp.toDate().getMonth()+'/'+Object[doc.id].timestamp.toDate().getFullYear();
                    Object[doc.id].timestamp = time;
                });
                dispatch({type:"GET_BILLS", bills:Object,categoryWiseAmount:CategoryWiseAmount,totalAmount:totalAmount});
            } 
            catch(error) {
                console.log(error);
            }

        }
        
    }
}






// export async function  ConvertDocstoObject(docs) {
//     return new Promise((resolve, reject) => {
//         var Object = {};
//         docs.forEach(doc => {
//             Object[doc.id] = doc.data();
//         })
//         resolve(Object)
//     })
// }