import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen font-mono px-6 pb-6 bg-[#292C33] text-[#DBE2E9]">
      <div className="flex flex-col items-start sticky top-0 bg-[#292C33] bg-opacity-80 backdrop-blur-sm">
        <div className="flex flex-row w-full justify-between mt-4 mb-2">
          <Link to={"/"} className="p-3 bg-gray-600 bg-opacity-40 rounded-2xl">
            <AiOutlineHome size={30} />
          </Link>
          <Link to={"/profile"} className="p-3 bg-gray-600 bg-opacity-40 rounded-2xl">
            <AiOutlineUser size={30} />
          </Link>
        </div>
        
        <div className="mb-2">
          <p className=" text-3xl">Bordspellen App</p>
          <p className="font-semibold">Dawn en Jop</p>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
