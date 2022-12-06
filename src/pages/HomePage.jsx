import { collection, onSnapshot } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import { db } from "../Firebase";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";


export default function HomePage() {

    const [games, setGames] = useState([]);

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
        });
    }
    
    useEffect(() => {
        fetchGames();
    }, [])

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row items-center mb-4 space-x-4">
                <div className="bg-gray-700 bg-opacity-80 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                    <p>{games.length} games</p>
                </div>
                <Link to={"/add"} className="bg-gray-700 bg-opacity-80 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                    <IoMdAdd size={20}/>
                </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-10 place-items-center gap-4">
            {games.map((game, i) => {
                return (
                    <Link to={`games/${game.id}`} key={i} className="flex flex-col justify-between bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 w-full h-48 rounded-3xl p-4">
                        <div className="flex flex-row w-full">
                            <p className="text-3xl p-4 bg-gray-700 bg-opacity-40 rounded-3xl">{game.shortName}</p>
                        </div>
                        <p className="text-white md:text-lg lg:text-xl text-center">{game.name}</p>
                        {/* <p className="text-white font-normal text-center">{game.scoreCount}</p> */}
                    </Link>
                );
            })}
            </div>
        </div>
        
    );
}