import {MagnifyingGlassIcon} from '@heroicons/react/20/solid'
import NotesModalComp from './NotesModalComp';
import { useState } from "react";
import { useEffect } from 'react';
import { getNotes } from '../actions/notes';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';


function NotesComp(props){

    const [modelState,setModalState] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getNotes(props.user));
    }, [dispatch, props.user]);

    return(
        <>
            <div>
                <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-base font-semibold leading-6 text-gray-900">Notes</h1>
                            <p className="mt-2 text-sm text-gray-700">
                                Stay organized and achieve your goals with Notes Manager.
                            </p>
                        </div>
                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex gap-x-5">
                            <div className="">
                        <label htmlFor="search" className="sr-only">
                            Search projects
                        </label>
                        <div className="relative text-gray-600 focus-within:text-gray-900">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                            </div>
                            <input
                            id="search"
                            name="search"
                            className="block w-full rounded-md border-0 bg-gray-400 bg-opacity-25 py-1.5 pl-10 pr-3 text-gray-100 placeholder:text-gray-600 focus:bg-gray-100 focus:text-gray-900 focus:outline-none focus:ring-0 focus:placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            placeholder="Search projects"
                            type="search"
                            />
                        </div>
                            </div>
                            <button
                            onClick={()=>setModalState(true)}
                            type="button"
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                            Add Note
                            </button>
                        </div>
                </div>
            
                <ul className="mt-4 space-y-2 py-4 sm:space-y-4">  
                    {
                        Object.values(props.notes).map((note, notesIndex) => (
                            <li key={notesIndex} className="bg-white px-4 py-4 shadow sm:rounded-lg">
                                <div className="sm:flex sm:items-baseline sm:justify-between">
                                    <h3 className="text-base font-medium">
                                    <span className="text-gray-900">{note.name}</span>
                                    </h3>
                                    <p className="mt-1 whitespace-nowrap text-sm text-gray-600 sm:ml-3 sm:mt-0">
                                    <time dateTime={note.timestamp}>{note.timestamp}</time>
                                    </p>
                                </div>
                                <div className="mt-4 space-y-6 text-sm text-gray-800">
                                    <p>{note.note}</p>
                                </div>
                            </li> 

                        ))


                    }
                     
                </ul>
            </div>
            {modelState?<NotesModalComp modelState={modelState} changeState={setModalState}/>:<></>}
        </>
    )

}


const mapStateToProps = (state) => {
    return {
      notes: state.Notes.notes,
      user:state.Login.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getNotes: (uid) => dispatch(getNotes(uid)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesComp);