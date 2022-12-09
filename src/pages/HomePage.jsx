import { React } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../Firebase";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function HomePage() {

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchGames = async () => {
        onSnapshot(collection(db, "games"), (querySnapshot) => {
            setGames(
                querySnapshot.docs.map(item => ({
                    id: item.id,
                    name: item.data()["name"],
                    shortName: item.data()["shortName"],
                    scoreType: item.data()["scoreType"],
                }))
            );
            setLoading(false);
        });
    }

    useEffect(() => {
        fetchGames();
    }, [])

    if (loading) {
        return (
            <div className="flex flex-col w-full">
                <div className="flex flex-row items-center mb-4 space-x-4">
                    <div className="bg-gray-700 bg-opacity-80 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                        <div className="flex flex-row space-x-2 items-center"><AiOutlineLoading3Quarters className="animate-spin" /><p>spellen</p></div>
                    </div>
                    <Link to={"/games/add"} className="bg-gray-700 bg-opacity-80 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                        <IoMdAdd size={20} />
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-10 place-items-center gap-4">
                    <div className="flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 w-full h-40 xl:h-52 to-pink-500 rounded-3xl p-4 justify-center items-center">
                        <AiOutlineLoading3Quarters size={64} className="animate-spin" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row items-center mb-4 space-x-4">
                <div className="bg-gray-700 bg-opacity-80 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                    <p>{games.length} spellen</p>
                </div>
                <Link to={"/games/add"} className="bg-gray-700 bg-opacity-80 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                    <IoMdAdd size={20} />
                </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-10 place-items-center gap-4">
                {games.map((game, i) => {
                    return (
                        <Link to={`games/${game.id}`} state={game} key={i} className="flex flex-col justify-between bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 w-full h-40 xl:h-52 rounded-3xl p-4">
                            <div className="flex flex-row w-full">
                                <p className="text-3xl p-4 bg-gray-700 bg-opacity-40 rounded-3xl">{game.shortName}</p>
                            </div>
                            <p className="text-white md:text-lg lg:text-xl text-center">{game.name}</p>
                        </Link>
                    );
                })}
            </div>
        </div>

    );
}