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
                      p-2"
      >
        <Link to={"/profile"} className="bg-red-200 rounded p-2">
          <AiOutlineUser size={20} />
        </Link>
        <Link to={"/"} className="font-bold">Bordspellen Dawn en Jop</Link>
      </div>
      <Outlet />
    </div>
  );
}
