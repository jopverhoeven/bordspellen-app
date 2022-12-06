import { React } from "react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";
import { IoMdArrowBack } from "react-icons/io";
import ErrorPage from "./ErrorPage";

function DeleteScorePage() {
    const navigator = useNavigate();
    const state = useLocation().state;
    const {gameId, scoreId} = useParams();
    const [game, setGame] = useState(state != null ? state.game : null);
    const [score, setScore] = useState(state != null ? state.score : null);
    const [loading, setLoading] = useState(game && score ? false : true);
    const [error, setError] = useState();

    const fetchGame = async () => {
        onSnapshot(doc(db, "games", gameId), (doc) => {
            if (!doc.exists()) {
                setError({status: "404", statusText: `Spel met id '${gameId}' niet gevonden`});
                return;
            }
            const data = doc.data();
            setGame({
                id: doc.id,
                name: data["name"],
                shortName: data["shortName"],
                scoreType: data["scoreType"]
            })
            fetchScore(doc.id);
        });
    }

    const fetchScore = async (docId) => {
        onSnapshot(doc(db, "games/"+docId+"/scores", scoreId), (doc) => {
            if (!doc.exists()) {
                setError({status: "404", statusText: `Score met id '${scoreId}' niet gevonden`});
                return;
            }
            const data = doc.data();
            setScore({
                id: doc.id,
                winner: data["winner"],
                participants: data["participants"],
                date: new Date(data["date"].seconds * 1000),
            })
            if (loading) setLoading(false);
        });
    }

    useEffect(() => {
        fetchGame();
    }, [])


    if (error) {
        return <ErrorPage status={error.status} statusText={error.statusText}/>
    }

    if (loading) {
        return <div></div>
    }

    async function handleDeleteScore() {
        await deleteDoc(doc(db, "games/"+game.id+"/scores", score.id));
        navigator('./../../../', {state: game});
    }

    return (
        <div className="flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-3xl p-4">
            <div className="flex flex-row w-full space-x-4  mb-4">
                <div className="flex flex-row items-center justify-center">
                    <p className="text-3xl p-4 bg-gray-600 bg-opacity-50 rounded-3xl">{game.shortName}</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-xl">{game.name}</p>
                </div>
            </div>
            <div className="flex flex-row items-center mb-4 space-x-4">
                <Link to={"./../"} state={{game: game, score: score}} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                    <IoMdArrowBack size={20} />
                </Link>
            </div>
            <div className="flex flex-col justify-center items-start space-y-4">
                <p>Weet je zeker dat de score van {score.winner}, gezet op {score.date.toLocaleDateString('nl')} {score.date.toLocaleTimeString('nl', {hour: "numeric", minute: "numeric", second:undefined})} wilt verwijderen?</p>
                <div className="flex flex-row justify-center space-x-4 w-full">
                    <button className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 w-full text-center" onClick={handleDeleteScore}>Ja</button>
                    <Link to={"./../"} state={{game: game, score: score}} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 w-full text-center">Annuleren</Link>
                </div>
            </div>
        </div>
    )
}

export default DeleteScorePage;