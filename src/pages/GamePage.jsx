import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";


export default function GamePage() {
    const { gameId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [game, setGame] = useState();
    const [scores, setScores] = useState([]);

    const fetchGame = async () => {
        onSnapshot(doc(db, "games", gameId), (doc) => {
            if (!doc.exists()) {
                setError(true);
            }
            const data = doc.data();
            setGame({
                id: doc.id,
                name: data["name"],
                shortName: data["shortName"]
            })
            if (loading) setLoading(false);
            fetchScores();
        });
    }
    
    const fetchScores = async () => {
        onSnapshot(collection(db, `games/${gameId}/scores`), (collection) => {
            const scores = collection.docs.map(score => ({
                                id: score.id,
                                winner: score.data()["winner"],
                                participants: score.data()["participants"],
                                date: score.data()["date"].seconds * 1000,
                            }));
            setScores(scores.sort(function(a, b) {
                return new Date(b.date) - new Date(a.date);
            }));
        });
    }
    
    useEffect(() => {
        fetchGame();
    }, [])

    if (error) {
        return <div>Spel met id '{gameId}' bestaat niet 😔</div>
    }

    if (loading) {
        return (
            <div className="flex flex-col p-2">
                <div className="flex flex-col w-full bg-red-200 rounded p-2">
                    <p className="text-center font-bold">Laden...</p>
                </div>
            </div>
        )
    }


    const scoresHtml = [];
    scores.map((score, i) => {
        const date = new Date(score.date);
        scoresHtml.push(
            <div key={i} className="flex flex-col w-full bg-red-200 rounded p-2">
                <p className="text-center text-xl font-bold">🏆 {score.winner}</p>
                <div className="text-center">
                    <p className="text-lg ">{date.toLocaleDateString('nl')}</p>
                    <p className="text-sm">{date.toLocaleTimeString('nl')}</p>
                </div>
            </div>
        )
    })


    return (
        <div className="flex flex-col p-2">
            <div className="flex flex-col w-full bg-red-200 rounded p-2">
                <p className="text-xl text-center font-bold">{game.shortName} {game.name}</p>
            </div>
                {scores.length === 0 ? 
                <p>Nog geen scores gevonden</p> 
                : 
                <div className="">
                    <p>Vorige uitslagen:</p>
                    <div className="grid grid-cols-3 place-items-center gap-2">
                    {scoresHtml}
                    </div>
                </div>
            }
        </div>
    )
}