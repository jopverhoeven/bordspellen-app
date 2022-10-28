import { collection, onSnapshot } from "firebase/firestore"; 
import { useState } from "react";
import { db } from "../Firebase";
import { Link } from "react-router-dom";


export default function HomePage() {

    const [games, setGames] = useState([]);

    onSnapshot(collection(db, "games"), (querySnapshot) => {
        setGames(
            querySnapshot.docs.map(item => ({
                id: item.id,
                name: item.data()["name"],
                shortName: item.data()["shortName"]
            }))
        );
    });
    

    return (
        <div className="p-2 grid grid-cols-3 place-items-center gap-2">
            {games.map((game, i) => {
                return (
                    <Link to={`games/${game.id}`} key={i} className="flex flex-col items-center justify-center text-center p-2 w-32 h-32 rounded bg-contain bg-no-repeat bg-center bg-red-200" style={{backgroundImage: `url(${game.image})`}}>
                        <p className="text-3xl">{game.shortName}</p>
                        <p>{game.name}</p>
                    </Link>
                );
            })}
        </div>
    );
}