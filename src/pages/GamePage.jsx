import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";


export default function GamePage() {
    const { gameId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [game, setGame] = useState();

    const fetchGame = async () => {
        const docSnapshot = await getDoc(doc(db, "games", gameId));

        if (!docSnapshot.exists()) {
            setError(true);
            return;
        }

        setGame({
            id: docSnapshot.id,
            name: docSnapshot.data()["name"],
        });
        setLoading(false);
    }

    useEffect(() => {
        fetchGame();
    }, []);

    if (error) {
        return <div>Spel met id '{gameId}' bestaat niet 😔</div>
    }

    if (loading) {
        return <div>Laden...</div>
    }

    return (
        <div>{game.name}</div>
    )
}