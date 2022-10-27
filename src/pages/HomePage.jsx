import { collection, getDocs } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import { db } from "../Firebase";
import { Link } from "react-router-dom";


export default function HomePage() {

    const [games, setGames] = useState([]);

    const fetchGames = async () => {
        const querySnapshot = await getDocs(collection(db, "games"));
        setGames(
            querySnapshot.docs.map(item => ({
                id: item.id,
                name: item.data()["name"],
                image: item.data()["image"]
            }))
        );
    }

    useEffect(() => {
        fetchGames();
    }, [])
    

    return (
        <div className="p-2 grid grid-cols-3 place-items-center gap-2">
            {games.map((game, i) => {
                return (
                    <Link to={`games/${game.id}`} key={i} className="flex items-center justify-center text-center p-2 w-32 h-32 rounded bg-contain bg-no-repeat bg-center bg-red-200" style={{backgroundImage: `url(${game.image})`}}>
                    </Link>
                );
            })}
        </div>
    );
}