/* eslint-disable react/prop-types */
import React from "react";
import { IoMdAdd, IoMdArrowBack, IoMdCreate, IoMdTrash } from "react-icons/io";
import { Link } from "react-router-dom";

function NavigationComponent(props) {

    const hideAll = props.hideAll ?? false;
    const hideEdit = props.hideEdit ?? false;
    const hideAdd = props.hideAdd ?? false;
    const hideDelete = props.hideDelete ?? false;
    const loading = props.loading ?? false;

    if (loading) {
        return (
            <div className="animate-pulse flex flex-row items-center mb-4 space-x-4">
                <div className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow h-10 w-10"></div>
            </div>
        )
    }

    return (
        <div className="flex flex-row items-center mb-4 space-x-4">
            <Link to={props.back} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                <IoMdArrowBack size={20} />
            </Link>
            {hideAll || hideEdit ? null : <Link to={"./edit"} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                <IoMdCreate size={20} />
            </Link>}
            {hideAll || hideAdd ? null : <Link to={"./add"} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                <IoMdAdd size={20} />
            </Link>}
            {hideAll || hideDelete ? null : <Link to={"./delete"} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                <IoMdTrash size={20} />
            </Link>}
        </div>
    )
}

export default NavigationComponent;