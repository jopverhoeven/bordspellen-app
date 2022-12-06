/* eslint-disable react/prop-types */
import { React } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useRouteError } from "react-router-dom";

function ErrorPage(props) {
    let error = useRouteError();

    if (error == null) {
        error = {
            status: props.status,
            statusText: props.statusText
        }
    }

    return (
        <div className="flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-3xl p-4">
            <p className="text-xl">{error.status}</p>
            <p>{error.statusText}</p>
            <div className="flex mt-4">
                <Link to={"/"} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                    <IoMdArrowBack size={20} />
                </Link>
            </div>

        </div>
    );
}

export default ErrorPage;