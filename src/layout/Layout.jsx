import { AiOutlineUser } from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen font-sans">
      <div
        className="flex flex-row
                      space-x-2 
                      items-center 
                      h-16 
                      mx-2
                      border-b
                      border-b-gray-400"
      >
        <Link to={"/profile"} className="bg-red-200 rounded p-2">
          <AiOutlineUser size={20} />
        </Link>
        <Link to={"/"} className="font-bold text-xl">(Bord)spellen Dawn en Jop</Link>
      </div>
      <Outlet />
    </div>
  );
}
