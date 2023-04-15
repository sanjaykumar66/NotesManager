import ModalComp from "../components/ModalComp";
import { useState,Fragment } from "react";
import { connect } from 'react-redux';
import { getBills } from "../actions/bills";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const people = []

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const filters = [
    {
      id: 'category',
      name: 'Category',
      options: [
        { value: 'Telephone Bills', label: 'Telephone Bills', checked: false },
        { value: 'Books Periodicals Bills', label: 'Books Periodicals Bills', checked: false },
        { value: 'Vehicle Menteinance Bills', label: 'Vehicle Menteinance Bills', checked: false },
        { value: 'LTA Bills', label: 'LTA Bills', checked: false },
        { value: 'Uniform Bills', label: 'Uniform Bills', checked: false },
      ],
    }
]



function BillsComp(props){

    const [modelState,setModalState] = useState(false);
    const dispatch = useDispatch();
    const [activeFilters, setActiveFilters] = useState([]);

    useEffect(() => {
        dispatch(getBills(props.user));
    }, [dispatch, props.user]);
    
    var CategoryWiseAmount = {
        'Telephone Bills':0,
        'Books Periodicals Bills':0,
        'Vehicle Menteinance Bills':0,
        'LTA Bills':0,
        'Uniform Bills':0
    }

    const handleCheckboxChange = (event) => {
        const { checked, value } = event.target;
        if (checked) {
          setActiveFilters([...activeFilters, value]);
        } else {
          setActiveFilters(activeFilters.filter((filter) => filter !== value));
        }
    };

    const removeFromFilter = (filterValue)=>{
        setActiveFilters(activeFilters.filter((filter) => filter !== filterValue));
    }

    return(
        <>
            <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Bills</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all the users in your account including their name, title, email and role.
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                        onClick={()=>setModalState(true)}
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                        Add Bills
                        </button>
                    </div>
            </div>
            <div className="mt-8 flow-root">

                <section aria-labelledby="filter-heading">
                    <h2 id="filter-heading" className="sr-only">
                        Filters
                    </h2>

                    <div className="border-b border-gray-200 bg-white pb-4 flex justify-end">
                        <div className="flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                            <div className="block">
                                <div className="flow-root">
                                    <Popover.Group className="-mx-4 flex items-center divide-x divide-gray-200">
                                        {filters.map((section, sectionIdx) => (
                                            <Popover key={section.name} className="relative inline-block px-4 text-left">
                                                <Popover.Button className="focus:outline-none focus-visible:none group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                                    <span>{section.name}</span>
                                                    {activeFilters.length ? (
                                                    <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                                                        {activeFilters.length}
                                                    </span>
                                                    ) : null}
                                                    <ChevronDownIcon
                                                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                    aria-hidden="true"
                                                    />
                                                </Popover.Button>

                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Popover.Panel className="absolute right-0 z-[11] mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <form className="space-y-4">
                                                        {section.options.map((option, optionIdx) => (
                                                        <div key={option.value} className="flex items-center">
                                                            <input
                                                            id={`filter-${section.id}-${optionIdx}`}
                                                            name={`${section.id}[]`}
                                                            value={option.value}
                                                            type="checkbox"
                                                            checked={activeFilters.includes(option.value)}
                                                            onChange={handleCheckboxChange}
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                            />
                                                            <label
                                                            htmlFor={`filter-${section.id}-${optionIdx}`}
                                                            className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                                                            >
                                                            {option.label}
                                                            </label>
                                                        </div>
                                                        ))}
                                                    </form>
                                                    </Popover.Panel>
                                                </Transition>
                                            </Popover>
                                        ))}
                                    </Popover.Group>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Active filters */}
                    <div className="bg-gray-100">
                        <div className="mx-auto max-w-7xl px-4 py-3 sm:flex sm:items-center sm:px-6 lg:px-8">
                            <h3 className="text-sm font-medium text-gray-500">
                                Filters
                                <span className="sr-only">, active</span>
                            </h3>

                            <div aria-hidden="true" className="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block" />
                                <div className="mt-2 sm:ml-4 sm:mt-0">
                                    <div className="-m-1 flex flex-wrap items-center">
                                        {activeFilters.map((activeFilter,index) => (
                                        <span
                                            key={index}
                                            className="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900"
                                        >
                                            <span>{activeFilter}</span>
                                            <button
                                            type="button"
                                            className="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                                            >
                                            <span className="sr-only">Remove filter for {activeFilter}</span>
                                                <svg  onClick={() => removeFromFilter(activeFilter)} className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                                                    <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                                                </svg>
                                            </button>
                                        </span>
                                        ))}
                                    </div>
                                </div>
                        </div>
                    </div>
                </section>
        
                <div className="my-2 lg:mx-8">
                        <div className="inline-block min-w-full py-2 align-middle">
                            <table className="min-w-full border-separate border-spacing-0">
                                <thead>
                                    <tr>
                                        <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                                        >
                                        Date
                                        </th>
                                        <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                                        >
                                        Name
                                        </th>
                                        <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter table-cell"
                                        >
                                        Category
                                        </th>
                                        <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter table-cell"
                                        >
                                        Amount
                                        </th>
                                        <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter table-cell"
                                        >
                                        File
                                        </th>
                                        <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                                        >
                                        <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.values(props.bills).map((person, personIdx) => (
                                        <tr key={personIdx}>
                                            <td
                                                className={classNames(
                                                personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                                                'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                                                )}
                                            >
                                                {person.timestamp}
                                            </td>
                                            <td
                                                className={classNames(
                                                personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                                                'whitespace-nowrap px-3 py-4 text-sm text-gray-500 table-cell'
                                                )}
                                            >
                                                {person.name}
                                            </td>
                                            <td
                                                className={classNames(
                                                personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                                                'whitespace-nowrap px-3 py-4 text-sm text-gray-500 table-cell'
                                                )}
                                            >
                                                {person.category}
                                            </td>
                                            <td
                                                className={classNames(
                                                personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                                                'whitespace-nowrap px-3 py-4 text-sm text-gray-500 table-cell'
                                                )}
                                            >
                                                {person.amount}
                                            </td>
                                            <td
                                                className={classNames(
                                                personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                                                'whitespace-nowrap px-3 py-4 text-sm text-gray-500 table-cell'
                                                )}
                                            >
                                                <a href={person.file} target="_blank" rel="noreferrer">
                                                    <PhotoIcon className="h-5 w-5 text-indigo-600"/>
                                                </a>
                                            </td>
                                            <td
                                                className={classNames(
                                                personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                                                'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8'
                                                )}
                                            >
                                                <div className="text-indigo-600 hover:text-indigo-900">
                                                Edit<span className="sr-only">, {person.name}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    {
                                        Object.keys(CategoryWiseAmount).map((category, index) => (
                                            <tr key={index}>
                                                <th scope="row" className="pl-6 pr-3 pt-6 text-left text-sm font-normal text-gray-500">
                                                    {category}
                                                </th>
                                                <td className="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">{props.categoryWiseAmount[category]}</td>
                                            </tr>
                                        ))
                                    }
                                    <tr>
                                        <th scope="row" className="pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900">
                                            Total
                                        </th>
                                        <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">{props.totalAmount}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                </div>

            </div>
            {modelState?<ModalComp modelState={modelState} changeState={setModalState}/>:<></>}
        </>
    )
}


const mapStateToProps = (state) => {
    return {
      bills: state.Bills.bills,
      user:state.Login.user,
      categoryWiseAmount:state.Bills.categoryWiseAmount,
      totalAmount:state.Bills.totalAmount
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBills: (uid) => dispatch(getBills(uid)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillsComp);