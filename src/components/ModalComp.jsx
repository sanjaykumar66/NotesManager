import { Fragment, useState } from 'react'
import { Dialog, Transition,Listbox } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { PhotoIcon } from '@heroicons/react/24/solid'
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import {Addbills} from '../actions/bills';

const BillsCategory = [
    { id: 1, name: 'Telephone Bills' },
    { id: 2, name: 'Books Periodicals Bills' },
    { id: 3, name: 'Vehicle Menteinance Bills' },
    { id: 4, name: 'LTA Bills' },
    { id: 5, name: 'Uniform Bills' }
  ]

  
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  

function ModalComp(props){
    const [selected, setSelected] = useState(BillsCategory[0])
    const [billName,setBillName] = useState('');
    const [totalAmount,setTotalAmount] = useState(0);
    const [file, setFile] = useState(false);
    const [ButtonLoader,setButtonLoader] = useState(false);
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
        // console.log(selected)
        // console.log(billName)
        // console.log(totalAmount)
        // console.log(file);
        setButtonLoader(true);
        dispatch(Addbills({user:props.user,billName,selected,totalAmount,file,callBackFunction}));
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
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                        Add Bill
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            The Add Bills makes it easy to track bills and stay organized financially.
                                        </p>
                                    </div>
                                    <form onSubmit={e => { handleSubmit(e) }}>
                                        <div className='mt-4'>
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Bill Name
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                    type="text"
                                                    value={billName}
                                                    onChange={e=>setBillName(e.target.value)}
                                                    name="name"
                                                    id="billName"
                                                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="Bill Name"
                                                    required
                                                    />
                                                </div>
                                            </div>
                                            <div className='mt-4'>
                                                <Listbox value={selected} onChange={setSelected}>
                                                    {({ open }) => (
                                                        <>
                                                        <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Assigned to</Listbox.Label>
                                                        <div className="relative mt-2">
                                                            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                            <span className="block truncate">{selected.name}</span>
                                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                            </span>
                                                            </Listbox.Button>

                                                            <Transition
                                                            show={open}
                                                            as={Fragment}
                                                            leave="transition ease-in duration-100"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                            >
                                                            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                                {BillsCategory.map((person) => (
                                                                <Listbox.Option
                                                                    key={person.id}
                                                                    className={({ active }) =>
                                                                    classNames(
                                                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                                        'relative cursor-default select-none py-2 pl-3 pr-9'
                                                                    )
                                                                    }
                                                                    value={person}
                                                                >
                                                                    {({ selected, active }) => (
                                                                    <>
                                                                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                        {person.name}
                                                                        </span>

                                                                        {selected ? (
                                                                        <span
                                                                            className={classNames(
                                                                            active ? 'text-white' : 'text-indigo-600',
                                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                            )}
                                                                        >
                                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                        </span>
                                                                        ) : null}
                                                                    </>
                                                                    )}
                                                                </Listbox.Option>
                                                                ))}
                                                            </Listbox.Options>
                                                            </Transition>
                                                        </div>
                                                        </>
                                                    )}
                                                </Listbox>
                                            </div>
                                            {

                                                !file?
                                                    <div className="mt-4">
                                                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Upload Bill
                                                        </label>
                                                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                                            <div className="text-center">
                                                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                                <label
                                                                htmlFor="file-upload"
                                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                                >
                                                                <span>Upload a file</span>
                                                                <input onChange={handleFileChange} id="file-upload" name="file-upload" type="file" className="sr-only" required/>
                                                                </label>
                                                                <p className="pl-1">or drag and drop</p>
                                                            </div>
                                                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                                            </div>
                                                        </div>
                                                    </div>:<div>{file.name}</div>
                                            }
                                            <div className='mt-4'>
                                                <label htmlFor="totalamount" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Total Amount
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                    min="0"
                                                    value={totalAmount}
                                                    onChange={e=>setTotalAmount(e.target.value)}
                                                    type="number"
                                                    name="totalamount"
                                                    id="totalAmount"
                                                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="0"
                                                    required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-6 sm:flex sm:flex-row-reverse">
                                            <button
                                                type="submit"
                                                className="items-center inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
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
                                                Add Bill
                                            </button>
                                            <button
                                                type="button"
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                onClick={() => props.changeState(false)}
                                            >
                                               
                                                Cancel
                                            </button>
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
        Addbills: (obj) => dispatch(Addbills(obj)),
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalComp);