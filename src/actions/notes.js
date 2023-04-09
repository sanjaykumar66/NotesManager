import {db,storage,StorageRef} from '../firebaseConfig';
import {collection, addDoc ,updateDoc,serverTimestamp, orderBy, getDocs,doc} from "firebase/firestore";
import { uploadBytes } from "firebase/storage";

export function AddNotes({user, name, note, file,callBackFunction}){
    return dispatch=>{

        var data = {
            name:name,
            note:note,
            timestamp:serverTimestamp(),
        };

        addDoc(collection(db,"users",user,"Notes"),data).then((key)=>{

            var temp = {};
            temp[key.id] = data;
            var time = new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getFullYear();
            temp[key.id].timestamp = time;

            if(file){
                var Path = user+'/'+new Date().getTime()+'_'+file.name;
                const storage_1 = StorageRef(storage, Path);
                uploadBytes(storage_1, file).then((snapshot) => {
                    console.log('Uploaded a blob or file!');

                    var thumbnail = "https://firebasestorage.googleapis.com/v0/b/mywork-1f85e.appspot.com/o/" + encodeURIComponent(Path) + "?alt=media";
                    updateDoc(doc(db,"users",user,"Notes",key.id),{
                        file:thumbnail
                    }).then(()=>{
                        temp[key.id].thumbnail = thumbnail;
                        dispatch({type:"GET_NOTES", notes:temp});
                        if(callBackFunction){
                            callBackFunction();
                        }
                    })

                })
            }
            else{
                dispatch({type:"GET_NOTES", notes:temp});
                if(callBackFunction){
                    callBackFunction();
                }
            }
        })
    }
}

export function getNotes(uid){
    return async dispatch => {

        if(uid){

            try {
                const querySnapshot = await getDocs(collection(db, 'users', uid, 'Notes'), orderBy('timestamp', 'desc'));
                const Object = {};
                querySnapshot.forEach(doc => {
                    Object[doc.id] = doc.data();
                    var time = Object[doc.id].timestamp.toDate().getDate()+'/'+Object[doc.id].timestamp.toDate().getMonth()+'/'+Object[doc.id].timestamp.toDate().getFullYear();
                    Object[doc.id].timestamp = time;
                });
                dispatch({type:"GET_NOTES", notes:Object});
            }
            catch(error) {
                console.log(error);
            }
        }
    }
}