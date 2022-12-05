import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col justify-between font-mono px-6 bg-[#292C33] text-[#DBE2E9]">
      <div className="flex flex-col ">
        <div className="flex flex-col items-start sticky top-0 bg-[#292C33] bg-opacity-80 backdrop-blur-sm">
          <div className="flex flex-row w-full justify-between mt-4 mb-4">
            <Link to={"/"} className="p-3 bg-gray-600 bg-opacity-40 rounded-2xl">
              <AiOutlineHome size={20} />
            </Link>
            <Link to={"/profile"} className="p-3 bg-gray-600 bg-opacity-40 rounded-2xl">
              <AiOutlineUser size={20} />
            </Link>
          </div>
          
          <div className="bg-gray-600 bg-opacity-50 rounded-3xl w-full p-4 mb-4">
            <p className=" text-3xl">Bordspellen App</p>
            <p className="font-semibold">Dawn en Jop</p>
          </div>
        </div>
        <Outlet />
      </div>
      <div className="py-4">Made with 😊</div>
    </div>
  );
}
