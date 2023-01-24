import { React } from "react";
import { AiOutlineGithub } from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col justify-between font-mono px-6 bg-[#292C33] text-[#DBE2E9]">
      <div className="flex flex-col mb-4">
        <div className="sticky top-0 z-50">
          <div className="bg-gray-700 rounded-3xl backdrop-blur-sm w-full p-4 mt-4 bg-opacity-80 ">
            <Link to={"/"} className=" text-3xl">Bordspellen App</Link>
            <p>Dawn en Jop</p>
          </div>
        </div>
        <div className="mt-4">
          {children ?? <Outlet />}
        </div>
      </div>
      <div className="flex flex-row justify-between items-center bg-gray-700 bg-opacity-80 rounded-3xl p-4 mb-4">
        <p>Made with 😊</p>
        <a href="https://github.com/jopverhoeven">
          <AiOutlineGithub size={24} />
        </a>
      </div>
    </div>
  );
}
