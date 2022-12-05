import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


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
                                date: new Date(score.data()["date"].seconds * 1000),
                            }));
            setScores(scores.sort(function(a, b) {
                return b.date - a.date;
            }));
        });
    }
    
    useEffect(() => {
        fetchGame();
    }, [])

    if (error) {
        return <div className="flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-3xl p-4">
        <p className="text-xl text-center w-full mb-4">Er is iets fout gegaan</p>
        <div className="mb-4">
            <Link to={"/"} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4">
                Terug
            </Link>
        </div>
    </div>
    }

    if (loading) {
        return (
            <div className="flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-3xl p-4">
            <div className="flex flex-row w-full items-center mb-4">
                <p className="text-3xl p-4 bg-gray-600 bg-opacity-50 rounded-3xl mr-4">
                    <AiOutlineLoading3Quarters className="animate-spin"/>
                </p>
                <p className="text-xl text-center w-full">
                    <AiOutlineLoading3Quarters className="animate-spin"/>
                </p>
            </div>
            <div className="flex flex-row justify-between items-center w-full mb-4 space-x-4">
                <Link to={"/edit"} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 w-full text-center">
                    Bewerken
                </Link>
                <Link to={"/add"} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 w-full text-center">
                    Toevoegen
                </Link>
            </div>
            <p className="bg-gray-600 bg-opacity-50 rounded-3xl p-4">
                <AiOutlineLoading3Quarters className="animate-spin"/>
            </p>
        </div>
        )
    }


    const scoresHtml = [];
    scores.forEach((score, i) => {
        const date = new Date(score.date);
        scoresHtml.push(
            <Link to={`./scores/${score.id}`} state={{score: score, game: game}} className="flex flex-row w-full py-2 space-x-2" key={i}>
                <div className="flex flex-col text-center text-xl bg-gray-600 bg-opacity-40 rounded-3xl p-4 w-20">
                    <p>🏆</p>
                    <p className="text-lg">{score.winner}</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <p className="">{score.participants.length} spelers</p>
                    <p className="">{date.toLocaleDateString('nl')}</p>
                    <p className="text-sm text-left">{date.toLocaleTimeString('nl', {hour: "numeric", minute: "numeric", second:undefined})}</p>
                </div>
            </Link>
        )
    })


    return (
        <div className="flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-3xl p-4">
            <div className="flex flex-row w-full items-center mb-4">
                <p className="text-3xl p-4 bg-gray-600 bg-opacity-50 rounded-3xl">{game.shortName}</p>
                <p className="text-xl text-center w-full">{game.name}</p>
            </div>
            <div className="flex flex-row justify-between items-center w-full mb-4 space-x-4">
                <Link to={"/edit"} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 w-full text-center">
                    Bewerken
                </Link>
                <Link to={"/add"} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 w-full text-center">
                    Toevoegen
                </Link>
            </div>
            {scores.length === 0 ? 
            <p className="bg-gray-600 bg-opacity-50 rounded-3xl p-4">Nog geen scores gevonden</p> 
            : 
            <div className="bg-gray-600 bg-opacity-50 rounded-3xl p-4">
                <p className="">Vorige uitslagen:</p>
                <div className="flex flex-col items-center justify-start">
                {scoresHtml}
                </div>
            </div>
            }
        </div>
    )
}