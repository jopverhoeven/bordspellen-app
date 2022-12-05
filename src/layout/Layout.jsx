import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen font-mono p-6">
      <div className="flex flex-col items-start">
        <div className="flex flex-row w-full justify-between mb-2">
          <Link to={"/"} className="p-2 border rounded-md">
            <AiOutlineHome size={20} />
          </Link>
          <Link to={"/profile"} className="p-2 border rounded-md">
            <AiOutlineUser size={20} />
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
