import { collection, onSnapshot } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import { db } from "../Firebase";
import { Link } from "react-router-dom";


export default function HomePage() {

    const [games, setGames] = useState([]);

    const fetchGames = async () => {
        onSnapshot(collection(db, "games"), (querySnapshot) => {
            setGames(
                querySnapshot.docs.map(item => ({
                    id: item.id,
                    name: item.data()["name"],
                    shortName: item.data()["shortName"]
                }))
            );
        });
    }
    
    useEffect(() => {
        fetchGames();
    }, [])

    return (
        <div className="flex flex-col w-full">
            <p className="mb-2 text-lg ml-2">{games.length} spelletjes</p>
            <div className="grid grid-cols-3 md:grid-cols-6 place-items-center">
            {games.map((game, i) => {
                return (
                    <div className="p-2 w-full">
                    <Link to={`games/${game.id}`} key={i} className="flex flex-col items-center justify-center text-center w-full h-32 rounded bg-contain bg-no-repeat bg-center bg-red-900 hover:bg-red-700 hover:scale-105 transition-all" style={{backgroundImage: `url(${game.image})`}}>
                        <p className="text-3xl">{game.shortName}</p>
                        <p>{game.name}</p>
                    </Link>
                    </div>
                );
            })}
        </div>
        </div>
        
    );
}