import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import {  PaperClipIcon } from '@heroicons/react/20/solid'
import { AddNotes } from '../actions/notes';

function NotesModalComp(props){

    const [ButtonLoader,setButtonLoader] = useState(false);
    const [name,setName] = useState('');
    const [note,setNote] = useState('');
    const [file, setFile] = useState(false);


    const dispatch = useDispatch();


    const closeModal = () =>{
        props.changeState(false)
    }

    const callBackFunction = () => {
        // callback function code here
        setButtonLoader(false);
        closeModal();
    };

    const handleSubmit= (e)  => {
        e.preventDefault();
        console.log(name)
        console.log(note)
        setButtonLoader(true);
        dispatch(AddNotes({user:props.user,name, note,file,callBackFunction}));
    }

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    return(
        <Transition.Root show={props.modelState} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                            <button
                                type="button"
                                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={() => props.changeState(false)}
                            >
                                <span className="sr-only">Close</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                            </div>
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                        Add Notes
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            The Add Bills makes it easy to track bills and stay organized financially.
                                        </p>
                                    </div>
                                    <form onSubmit={e => { handleSubmit(e) }} className="mt-6 relative">
                                        <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                                            <label htmlFor="title" className="sr-only">
                                                Title
                                            </label>
                                            <input
                                            value={name}
                                            onChange={(e)=>setName(e.target.value)}
                                            type="text"
                                            name="title"
                                            id="title"
                                            className="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
                                            placeholder="Title"
                                            />
                                            <label htmlFor="description" className="sr-only">
                                                Description
                                            </label>
                                            <textarea
                                            value={note}
                                            onChange={(e)=>setNote(e.target.value)}
                                            rows={5}
                                            name="description"
                                            id="description"
                                            className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="Write a description..."
                                            // defaultValue={''}
                                            />

                                            {/* Spacer element to match the height of the toolbar */}
                                            <div aria-hidden="true">
                                            <div className="py-2">
                                                <div className="h-9" />
                                            </div>
                                            <div className="h-px" />
                                            <div className="py-2">
                                                <div className="py-px">
                                                <div className="h-9" />
                                                </div>
                                            </div>
                                            </div>
                                        </div>

                                        <div className="absolute inset-x-px bottom-0">                                            
                                            <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
                                                <div className="flex">
                                                    <button
                                                        onClick={()=>{document.getElementById('notes_files').click()}}
                                                        type="button"
                                                        className="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"
                                                    >
                                                    <PaperClipIcon className="-ml-1 mr-2 h-5 w-5 group-hover:text-gray-500" aria-hidden="true" />
                                                    <span className="text-sm italic text-gray-500 group-hover:text-gray-600">Attach a file</span>
                                                    </button>
                                                    <input onChange={handleFileChange} id="notes_files" name="notes_files" type="file" className="sr-only"/>

                                                    {file?<div>{file.name}</div>:<></>}
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <button
                                                    type="submit"
                                                    className="items-center inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    >
                                                        {ButtonLoader?
                                                            <>
                                                                <svg  aria-hidden="true" className="w-4 h-4s mr-2 text-white animate-spin fill-blue-200" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                                </svg>
                                                                <span className="sr-only">Loading...</span>
                                                            </>:<></>
                                                        }
                                                        Add Note
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            
                        </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

const mapStateToProps = (state) => {
    return {
      user: state.Login.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        AddNotes: ({user, name, note, file,callBackFunction}) => dispatch(AddNotes({user, name, note, file,callBackFunction})),
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(NotesModalComp);