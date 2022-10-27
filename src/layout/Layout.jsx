import { AiOutlineMenu } from "react-icons/ai";
import { Outlet } from "react-router-dom";

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
        <button className="bg-red-200 rounded p-2">
          <AiOutlineMenu size={20} />
        </button>
        <p className="font-bold">Bordspellen Dawn en Jop</p>
      </div>
      <Outlet />
    </div>
  );
}
