import { AiOutlineUser } from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen font-sans bg-[#060b19] text-white">
      <div
        className="flex flex-row
                      space-x-2 
                      items-center 
                      h-16 
                      mx-2
                      border-b
                      border-b-gray-400"
      >
        <Link to={"/profile"} className="bg-red-900 rounded p-2 hover:bg-red-700 hover:scale-105">
          <AiOutlineUser size={20} />
        </Link>
        <Link to={"/"} className="font-bold text-xl">(Bord)spellen Dawn en Jop</Link>
      </div>
      <Outlet />
    </div>
  );
}
