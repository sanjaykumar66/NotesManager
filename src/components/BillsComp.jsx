import ModalComp from "../components/ModalComp";
import { useState } from "react";
import { connect } from 'react-redux';
import { getBills } from "../actions/bills";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid'

const people = []

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function BillsComp(props){

    const [modelState,setModalState] = useState(false);
    const dispatch = useDispatch();

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